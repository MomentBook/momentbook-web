#!/usr/bin/env node

const MOBILE_FORMAT = "momentbook.journey-archive";
const MOBILE_SCHEMA_VERSION = 3;
const RECAP_MODES = /** @type {const} */ (["ROUTE_STRONG", "ROUTE_WEAK", "ROUTE_NONE"]);
const RECAP_OVERRIDE_OPERATION_TYPES = /** @type {const} */ ([
  "ROUTE_STOP_REORDER",
  "PHOTO_REMOVE",
  "PHOTO_REASSIGN",
]);
const ALLOWED_TIMELINE_TYPES = /** @type {const} */ ([
  "ROUTE_STOP",
  "ORPHAN_CLUSTER",
  "ORPHAN_PHOTO",
]);
const LEGACY_TO_MOBILE_TIMELINE_TYPE = {
  PHOTO_GROUP: "ORPHAN_CLUSTER",
};
const ALLOWED_RECAP_STAGE = /** @type {const} */ ([
  "NONE",
  "SYSTEM_DONE",
  "USER_DONE",
]);

function isString(value) {
  return typeof value === "string";
}

function isBoolean(value) {
  return typeof value === "boolean";
}

function isValidNumber(value) {
  return Number.isFinite(value) && Number.isFinite(Number(value));
}

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function isISO8601(value) {
  if (!isString(value)) {
    return false;
  }

  return !Number.isNaN(Date.parse(value));
}

function isLocation(value) {
  return (
    isObject(value) &&
    isValidNumber(value.lat) &&
    isValidNumber(value.lng)
  );
}

function normalizeTimelineType(type, hasLocationName) {
  if (typeof type !== "string") {
    return "ORPHAN_CLUSTER";
  }

  if (ALLOWED_TIMELINE_TYPES.includes(type)) {
    return type;
  }

  if (type === "PHOTO_GROUP") {
    return hasLocationName ? "ROUTE_STOP" : "ORPHAN_CLUSTER";
  }

  if (type in LEGACY_TO_MOBILE_TIMELINE_TYPE) {
    return LEGACY_TO_MOBILE_TIMELINE_TYPE[type];
  }

  return "ORPHAN_CLUSTER";
}

function normalizeTimelineItem(item) {
  const timelineId = isString(item.timelineId) ? item.timelineId : "";
  const startAt = Number(item.startAt);
  const endAt = Number(item.endAt);
  const locationName = isString(item.locationName) && item.locationName.trim().length > 0 ? item.locationName : undefined;
  const type = normalizeTimelineType(
    isString(item.type) ? item.type : "",
    locationName !== undefined,
  );

  const photoIds = Array.isArray(item.photoIds)
    ? item.photoIds.map((id) => String(id))
    : [];

  return {
    timelineId,
    order: isValidNumber(item.order) ? Number(item.order) : undefined,
    type,
    startAt,
    endAt,
    locationName: locationName,
    photoIds,
  };
}

function normalizePhotoItem(photo) {
  return {
    photoId: isString(photo.photoId) ? photo.photoId : String(photo.photoId ?? ""),
    takenAt: Number(photo.takenAt),
    archivePath: isString(photo.archivePath) ? photo.archivePath : "",
    sourceUri: isString(photo.sourceUri) ? photo.sourceUri : undefined,
    hasGps: isBoolean(photo.hasGps) ? photo.hasGps : undefined,
    location: isLocation(photo.location) ? photo.location : undefined,
    caption: isString(photo.caption) || photo.caption === null ? photo.caption : undefined,
  };
}

function buildJourneyMetadata(journey) {
  const baseMetadata = isObject(journey.metadata) ? journey.metadata : {};
  const title = isString(baseMetadata.title) ? baseMetadata.title : isString(journey.title) ? journey.title : undefined;
  const description = isString(baseMetadata.description)
    ? baseMetadata.description
    : isString(journey.description)
      ? journey.description
      : undefined;

  return { ...baseMetadata, title, description };
}

function buildRecapDraft(journey, timeline, photos) {
  const locationSampleCount = timeline.filter((item) => item.locationName).length;
  const startedAt = Number(journey.startedAt);
  const endedAt = isValidNumber(journey.endedAt) ? Number(journey.endedAt) : undefined;

  return {
    schemaVersion: MOBILE_SCHEMA_VERSION,
    draftId: `${journey.id}-import-draft`,
    mode: "ROUTE_STRONG",
    createdAt: isValidNumber(journey.createdAt) ? Number(journey.createdAt) : startedAt,
    updatedAt: isValidNumber(journey.updatedAt) ? Number(journey.updatedAt) : isValidNumber(journey.createdAt) ? Number(journey.createdAt) : startedAt,
    journey: {
      journeyId: journey.id,
      startedAt,
      ...(isValidNumber(endedAt) ? { endedAt: Number(endedAt) } : {}),
      locationSampleCount,
      photoCount: photos.length,
    },
    timeline: timeline.map((item) => ({
      timelineId: item.timelineId,
      type: item.type,
      time: {
        startAt: Number(item.startAt),
        endAt: Number(item.endAt),
        durationMs: Math.max(0, Number(item.endAt) - Number(item.startAt)),
      },
      ...(isLocation(item.location) ? { location: item.location } : {}),
      photoIds: item.photoIds,
    })),
    photos: photos.map((photo) => ({
      photoId: photo.photoId,
      takenAt: Number(photo.takenAt),
      archivePath: photo.archivePath,
      hasGps: photo.hasGps,
      ...(photo.location ? { location: photo.location } : {}),
      width: isValidNumber(photo.width) ? Number(photo.width) : undefined,
      height: isValidNumber(photo.height) ? Number(photo.height) : undefined,
    })),
  };
}

export function normalizeJourneyImportToV3(rawPayload) {
  const source = isObject(rawPayload) ? rawPayload : {};
  const sourceJourney = isObject(source.journey) ? source.journey : {};
  const timeline = Array.isArray(source.timeline)
    ? source.timeline.map(normalizeTimelineItem)
    : [];
  const photos = Array.isArray(source.photos)
    ? source.photos.map(normalizePhotoItem)
    : [];

  const startedAt = Number(sourceJourney.startedAt);
  const endedAt = isValidNumber(sourceJourney.endedAt)
    ? Number(sourceJourney.endedAt)
    : undefined;

  const journey = {
    id: isString(sourceJourney.id) ? sourceJourney.id : String(sourceJourney.id ?? ""),
    startedAt,
    ...(isValidNumber(endedAt) ? { endedAt: Number(endedAt) } : {}),
    ...(isBoolean(sourceJourney.isTemporary) ? { isTemporary: sourceJourney.isTemporary } : {}),
    ...(isBoolean(sourceJourney.isArchived) ? { isArchived: sourceJourney.isArchived } : {}),
    ...(isString(sourceJourney.recapStage) && ALLOWED_RECAP_STAGE.includes(sourceJourney.recapStage)
      ? { recapStage: sourceJourney.recapStage }
      : {}),
    ...(isValidNumber(sourceJourney.recapSystemCompletedAt)
      ? { recapSystemCompletedAt: Number(sourceJourney.recapSystemCompletedAt) }
      : {}),
    ...(isValidNumber(sourceJourney.recapUserCompletedAt)
      ? { recapUserCompletedAt: Number(sourceJourney.recapUserCompletedAt) }
      : {}),
    ...(isString(sourceJourney.title) ? { title: sourceJourney.title } : {}),
    ...(isString(sourceJourney.description) ? { description: sourceJourney.description } : {}),
    metadata: buildJourneyMetadata(sourceJourney),
    createdAt: isValidNumber(sourceJourney.createdAt)
      ? Number(sourceJourney.createdAt)
      : startedAt,
    updatedAt: isValidNumber(sourceJourney.updatedAt)
      ? Number(sourceJourney.updatedAt)
      : startedAt,
  };

  const exports = {
    schemaVersion: MOBILE_SCHEMA_VERSION,
    format: MOBILE_FORMAT,
    exportedAt: isISO8601(source.exportedAt) ? String(source.exportedAt) : new Date().toISOString(),
    journey,
    timeline,
    photos,
    recap: {
      photoIdSpace: "EXTERNAL_ID",
      draft: source?.recap?.draft
        ? source.recap.draft
        : buildRecapDraft(journey, timeline, photos),
      overrides: isObject(source?.recap?.overrides)
        ? source.recap.overrides
        : {
            ops: [],
            hiddenPhotoIds: [],
            manualAssignments: [],
            manualClusterEdits: [],
          },
    },
    media: isObject(source?.media)
      ? {
          includedPhotoCount: isValidNumber(source.media.includedPhotoCount)
            ? Number(source.media.includedPhotoCount)
            : photos.length,
          skippedPhotoCount: isValidNumber(source.media.skippedPhotoCount)
            ? Number(source.media.skippedPhotoCount)
            : 0,
        }
      : {
          includedPhotoCount: photos.length,
          skippedPhotoCount: 0,
        },
  };

  return exports;
}

function pushError(errors, message) {
  errors.push(message);
}

function validatePhotoIdUniqueness(errors, photos) {
  const seen = new Set();
  const duplicateIds = new Set();

  for (const photo of photos) {
    if (!isString(photo.photoId)) {
      pushError(errors, "Photo id must be a string");
      return;
    }

    if (seen.has(photo.photoId)) {
      duplicateIds.add(photo.photoId);
      continue;
    }

    seen.add(photo.photoId);
  }

  if (duplicateIds.size > 0) {
    pushError(
      errors,
      `Duplicate photoId(s): ${Array.from(duplicateIds).sort().join(", ")}`,
    );
  }
}

function collectPhotoIds(photos) {
  return new Set(
    photos
      .map((photo) => photo.photoId)
      .filter((photoId) => isString(photoId)),
  );
}

function validateTimelineItem(errors, item, photoIds, index) {
  const pathPrefix = `timeline[${index}]`;

  if (!isString(item.timelineId) || item.timelineId.length === 0) {
    pushError(errors, `${pathPrefix}.timelineId is required`);
  }

  if (!isValidNumber(item.startAt)) {
    pushError(errors, `${pathPrefix}.startAt must be a finite number`);
  }

  if (!isValidNumber(item.endAt)) {
    pushError(errors, `${pathPrefix}.endAt must be a finite number`);
  }

  if (!ALLOWED_TIMELINE_TYPES.includes(item.type)) {
    pushError(errors, `${pathPrefix}.type must be one of ROUTE_STOP, ORPHAN_CLUSTER, ORPHAN_PHOTO`);
  }

  if (!Array.isArray(item.photoIds)) {
    pushError(errors, `${pathPrefix}.photoIds must be an array`);
    return;
  }

  for (const photoId of item.photoIds) {
    if (!isString(photoId)) {
      pushError(errors, `${pathPrefix}.photoId must be strings`);
      continue;
    }

    if (!photoIds.has(photoId)) {
      pushError(errors, `${pathPrefix}.photoId "${photoId}" not found in photos`);
    }
  }
}

function validatePhotoItem(errors, photo, index) {
  const pathPrefix = `photos[${index}]`;

  if (!isString(photo.photoId)) {
    pushError(errors, `${pathPrefix}.photoId must be a string`);
  }

  if (!isValidNumber(photo.takenAt)) {
    pushError(errors, `${pathPrefix}.takenAt must be a finite number`);
  }

  if (!isString(photo.archivePath) || photo.archivePath.length === 0) {
    pushError(errors, `${pathPrefix}.archivePath must be a non-empty string`);
  }

  if (photo.caption !== undefined && !(isString(photo.caption) || photo.caption === null)) {
    pushError(errors, `${pathPrefix}.caption must be string or null`);
  }
}

function validateRecapOverrides(errors, overrides, photoIds) {
  if (!isObject(overrides)) {
    pushError(errors, "recap.overrides must be an object");
    return;
  }

  if (!Array.isArray(overrides.ops)) {
    pushError(errors, "recap.overrides.ops must be an array");
  } else {
    for (const operation of overrides.ops) {
      if (!isObject(operation)) {
        pushError(errors, "recap.overrides.ops entries must be objects");
        continue;
      }

      if ("type" in operation && !RECAP_OVERRIDE_OPERATION_TYPES.includes(operation.type)) {
        pushError(
          errors,
          `recap.overrides.ops type "${operation.type}" is unsupported`,
        );
      }

      if (operation.photoId !== undefined && !isString(operation.photoId)) {
        pushError(errors, "recap.overrides.ops.photoId must be a string if provided");
      }
      if (operation.photoId !== undefined && !photoIds.has(operation.photoId)) {
        pushError(
          errors,
          `recap.overrides.ops.photoId "${operation.photoId}" not found in photos`,
        );
      }
    }
  }

  if (!Array.isArray(overrides.hiddenPhotoIds)) {
    pushError(errors, "recap.overrides.hiddenPhotoIds must be an array");
  } else {
    for (const photoId of overrides.hiddenPhotoIds) {
      if (!isString(photoId)) {
        pushError(errors, "recap.overrides.hiddenPhotoIds entries must be strings");
        continue;
      }
      if (!photoIds.has(photoId)) {
        pushError(
          errors,
          `recap.overrides.hiddenPhotoIds "${photoId}" not found in photos`,
        );
      }
    }
  }

  if (!Array.isArray(overrides.manualAssignments)) {
    pushError(errors, "recap.overrides.manualAssignments must be an array");
  } else {
    for (const [index, assignment] of overrides.manualAssignments.entries()) {
      const pathPrefix = `recap.overrides.manualAssignments[${index}]`;
      if (!isObject(assignment)) {
        pushError(errors, `${pathPrefix} must be an object`);
        continue;
      }
      if (!isString(assignment.photoId)) {
        pushError(errors, `${pathPrefix}.photoId must be a string`);
        continue;
      }
      if (!photoIds.has(assignment.photoId)) {
        pushError(
          errors,
          `${pathPrefix}.photoId "${assignment.photoId}" not found in photos`,
        );
      }
      if (!isString(assignment.targetClusterId)) {
        pushError(errors, `${pathPrefix}.targetClusterId must be a string`);
      }
      if (
        assignment.positionIndex !== undefined &&
        !isValidNumber(assignment.positionIndex)
      ) {
        pushError(errors, `${pathPrefix}.positionIndex must be a number if provided`);
      }
    }
  }

  if (
    overrides.blockOrder !== undefined &&
    !Array.isArray(overrides.blockOrder)
  ) {
    pushError(errors, "recap.overrides.blockOrder must be an array");
  }

  if (Array.isArray(overrides.blockOrder)) {
    for (const photoId of overrides.blockOrder) {
      if (isString(photoId) && !photoIds.has(photoId)) {
        pushError(
          errors,
          `recap.overrides.blockOrder "${photoId}" not found in photos`,
        );
      }
    }
  }
}

function validateRecapDraft(errors, draft, photoIds) {
  if (!isObject(draft)) {
    pushError(errors, "recap.draft must be an object");
    return;
  }

  if (!isValidNumber(draft.schemaVersion)) {
    pushError(errors, "recap.draft.schemaVersion must be a number");
  }
  if (!isString(draft.draftId)) {
    pushError(errors, "recap.draft.draftId must be a string");
  }
  if (!RECAP_MODES.includes(draft.mode)) {
    pushError(errors, "recap.draft.mode must be ROUTE_STRONG|ROUTE_WEAK|ROUTE_NONE");
  }
  if (!isValidNumber(draft.createdAt)) {
    pushError(errors, "recap.draft.createdAt must be a number");
  }
  if (!isValidNumber(draft.updatedAt)) {
    pushError(errors, "recap.draft.updatedAt must be a number");
  }
  if (!isObject(draft.journey)) {
    pushError(errors, "recap.draft.journey must be an object");
  } else {
    if (!isString(draft.journey.journeyId)) {
      pushError(errors, "recap.draft.journey.journeyId must be a string");
    }
    if (!isValidNumber(draft.journey.startedAt)) {
      pushError(errors, "recap.draft.journey.startedAt must be a number");
    }
    if (draft.journey.endedAt !== undefined && !isValidNumber(draft.journey.endedAt)) {
      pushError(errors, "recap.draft.journey.endedAt must be a number");
    }
    if (!isValidNumber(draft.journey.locationSampleCount)) {
      pushError(errors, "recap.draft.journey.locationSampleCount must be a number");
    }
    if (!isValidNumber(draft.journey.photoCount)) {
      pushError(errors, "recap.draft.journey.photoCount must be a number");
    }
  }

  if (!Array.isArray(draft.timeline)) {
    pushError(errors, "recap.draft.timeline must be an array");
  } else {
    draft.timeline.forEach((item, index) => {
      const pathPrefix = `recap.draft.timeline[${index}]`;
      if (!isObject(item)) {
        pushError(errors, `${pathPrefix} must be an object`);
        return;
      }
      if (!isString(item.timelineId)) {
        pushError(errors, `${pathPrefix}.timelineId must be a string`);
      }
      if (!ALLOWED_TIMELINE_TYPES.includes(item.type)) {
        pushError(
          errors,
          `${pathPrefix}.type must be one of ROUTE_STOP, ORPHAN_CLUSTER, ORPHAN_PHOTO`,
        );
      }
      if (!isObject(item.time)) {
        pushError(errors, `${pathPrefix}.time must be an object`);
      } else {
        if (!isValidNumber(item.time.startAt)) {
          pushError(errors, `${pathPrefix}.time.startAt must be a number`);
        }
        if (!isValidNumber(item.time.endAt)) {
          pushError(errors, `${pathPrefix}.time.endAt must be a number`);
        }
        if (!isValidNumber(item.time.durationMs)) {
          pushError(errors, `${pathPrefix}.time.durationMs must be a number`);
        }
      }
      if (!Array.isArray(item.photoIds)) {
        pushError(errors, `${pathPrefix}.photoIds must be an array`);
      } else {
        for (const photoId of item.photoIds) {
          if (!isString(photoId)) {
            pushError(errors, `${pathPrefix}.photoIds entries must be strings`);
            continue;
          }
          if (!photoIds.has(photoId)) {
            pushError(
              errors,
              `${pathPrefix}.photoId "${photoId}" not found in photos`,
            );
          }
        }
      }
    });
  }

  if (!Array.isArray(draft.photos)) {
    pushError(errors, "recap.draft.photos must be an array");
    return;
  }

  for (const photo of draft.photos) {
    if (!isObject(photo)) {
      pushError(errors, "recap.draft.photos entries must be objects");
      continue;
    }
    if (!isString(photo.photoId)) {
      pushError(errors, "recap.draft.photos.photoId must be a string");
      continue;
    }
    if (!photoIds.has(photo.photoId)) {
      pushError(
        errors,
        `recap.draft.photos.photoId "${photo.photoId}" not found in photos`,
      );
    }
  }
}

export function validateJourneyImportV3(payload) {
  const errors = [];
  const value = isObject(payload) ? payload : {};

  if (value.schemaVersion !== MOBILE_SCHEMA_VERSION) {
    pushError(
      errors,
      `schemaVersion must be ${MOBILE_SCHEMA_VERSION}, got ${String(value.schemaVersion)}`,
    );
  }

  if (value.format !== MOBILE_FORMAT) {
    pushError(
      errors,
      `format must be ${MOBILE_FORMAT}, got ${String(value.format)}`,
    );
  }

  if (!isISO8601(value.exportedAt)) {
    pushError(errors, "exportedAt must be ISO string");
  }

  if (!isObject(value.journey)) {
    pushError(errors, "journey must be an object");
  } else {
    if (!isString(value.journey.id)) {
      pushError(errors, "journey.id must be a string");
    }
    if (!isValidNumber(value.journey.startedAt)) {
      pushError(errors, "journey.startedAt must be a number");
    }
    if (value.journey.endedAt !== undefined && !isValidNumber(value.journey.endedAt)) {
      pushError(errors, "journey.endedAt must be a number if provided");
    }
    if (
      value.journey.isTemporary !== undefined &&
      !isBoolean(value.journey.isTemporary)
    ) {
      pushError(errors, "journey.isTemporary must be boolean if provided");
    }
    if (value.journey.isArchived !== undefined && !isBoolean(value.journey.isArchived)) {
      pushError(errors, "journey.isArchived must be boolean if provided");
    }
    if (value.journey.recapStage !== undefined && !ALLOWED_RECAP_STAGE.includes(value.journey.recapStage)) {
      pushError(errors, "journey.recapStage must be NONE|SYSTEM_DONE|USER_DONE if provided");
    }
    if (
      value.journey.recapSystemCompletedAt !== undefined &&
      !isValidNumber(value.journey.recapSystemCompletedAt)
    ) {
      pushError(errors, "journey.recapSystemCompletedAt must be a number if provided");
    }
    if (
      value.journey.recapUserCompletedAt !== undefined &&
      !isValidNumber(value.journey.recapUserCompletedAt)
    ) {
      pushError(errors, "journey.recapUserCompletedAt must be a number if provided");
    }
    if (value.journey.createdAt === undefined || !isValidNumber(value.journey.createdAt)) {
      pushError(errors, "journey.createdAt must be a number");
    }
    if (value.journey.updatedAt === undefined || !isValidNumber(value.journey.updatedAt)) {
      pushError(errors, "journey.updatedAt must be a number");
    }
  }

  if (!Array.isArray(value.timeline)) {
    pushError(errors, "timeline must be an array");
  }

  if (!Array.isArray(value.photos)) {
    pushError(errors, "photos must be an array");
  }

  if (!Array.isArray(value.timeline) || !Array.isArray(value.photos)) {
    return { isValid: false, errors };
  }

  const photoIds = collectPhotoIds(value.photos);
  validatePhotoIdUniqueness(errors, value.photos);

  if (photoIds.size !== value.photos.length) {
    pushError(errors, "photos must contain unique photoId values");
  }

  for (const [index, item] of value.timeline.entries()) {
    validateTimelineItem(errors, item, photoIds, index);
  }

  value.photos.forEach((photo, index) => {
    validatePhotoItem(errors, photo, index);
  });

  if (value.recap !== undefined) {
    if (!isObject(value.recap)) {
      pushError(errors, "recap must be an object");
    } else {
      if (value.recap.photoIdSpace !== "EXTERNAL_ID") {
        pushError(errors, `recap.photoIdSpace must be EXTERNAL_ID, got ${String(value.recap.photoIdSpace)}`);
      }

      validateRecapDraft(errors, value.recap.draft, photoIds);
      validateRecapOverrides(errors, value.recap.overrides, photoIds);
    }
  }

  if (value.media !== undefined) {
    if (!isObject(value.media)) {
      pushError(errors, "media must be an object");
    } else {
      const includedPhotoCount = Number(value.media.includedPhotoCount);
      const skippedPhotoCount = Number(value.media.skippedPhotoCount);

      if (!isValidNumber(includedPhotoCount)) {
        pushError(errors, "media.includedPhotoCount must be a number");
      }
      if (!isValidNumber(skippedPhotoCount)) {
        pushError(errors, "media.skippedPhotoCount must be a number");
      }
      if (isValidNumber(includedPhotoCount) && includedPhotoCount !== value.photos.length) {
        pushError(
          errors,
          `media.includedPhotoCount must equal photos.length (${value.photos.length}), got ${includedPhotoCount}`,
        );
      }
    }
  }

  return { isValid: errors.length === 0, errors };
}

export {
  MOBILE_FORMAT,
  MOBILE_SCHEMA_VERSION,
  isValidNumber,
  isISO8601,
};
