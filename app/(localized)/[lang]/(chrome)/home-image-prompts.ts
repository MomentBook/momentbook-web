import type { Language } from "@/lib/i18n/config";

export type HomeMarketingImagePromptKey =
  | "resultOverview"
  | "photoPile"
  | "batchImport"
  | "timelineFormation"
  | "organizedResult";

export type HomeMarketingImagePrompt = {
  label: string;
  alt: string;
  shortHint: string;
  prompt: string;
};

const HOME_MARKETING_IMAGE_PROMPTS: Record<
  Language,
  Record<HomeMarketingImagePromptKey, HomeMarketingImagePrompt>
> = {
  en: {
    resultOverview: {
      label: "Organized trip overview video prompt",
      alt: "Video generation prompt for the finished travel timeline overview.",
      shortHint: "Result-first video prompt for the finished timeline.",
      prompt:
        "6-second editorial product video. Slow dolly-in on a phone showing one trip organized into a clear timeline by time and place, soft forest-green UI, warm sand light, realistic travel photos, no hype graphics.",
    },
    photoPile: {
      label: "Travel photos piling up video prompt",
      alt: "Video generation prompt for a growing pile of travel photos.",
      shortHint: "Mixed travel photos before import.",
      prompt:
        "6-second overhead video. Mixed travel photos from one trip spread across a table in natural daylight, honest documentary mood, soft motion, no text overlays.",
    },
    batchImport: {
      label: "Batch import selection video prompt",
      alt: "Video generation prompt for selecting many travel photos at once.",
      shortHint: "Batch import selection prompt.",
      prompt:
        "6-second close product video. A phone selects many trip photos at once, gentle tap motion, clean neutral UI, calm editorial framing, no celebratory effects.",
    },
    timelineFormation: {
      label: "Timeline taking shape video prompt",
      alt: "Video generation prompt for photos grouping into timeline moments.",
      shortHint: "Photos become grouped moments.",
      prompt:
        "6-second transition video. Scattered trip photos inside a phone UI softly group into moments by time and place, readable timeline, restrained motion, quiet cinematic tone.",
    },
    organizedResult: {
      label: "Finished timeline detail video prompt",
      alt: "Video generation prompt for the final organized timeline detail.",
      shortHint: "Closer look at the finished timeline.",
      prompt:
        "6-second close-up video. The finished trip timeline shows grouped moments and place labels in a calm phone UI, editorial lighting, no social or productivity motifs.",
    },
  },
  ko: {
    resultOverview: {
      label: "정리된 여행 개요 비디오 프롬프트",
      alt: "완성된 여행 타임라인 개요를 위한 비디오 생성 프롬프트.",
      shortHint: "정리된 결과를 먼저 보여주는 타임라인 프롬프트.",
      prompt:
        "6초 길이의 에디토리얼 제품 영상. 한 번의 여행이 시간과 장소 기준의 또렷한 타임라인으로 정리된 화면을 휴대폰 안에서 천천히 당겨 보여줍니다. 부드러운 포레스트 그린 UI, 따뜻한 샌드 톤의 빛, 현실적인 여행 사진, 과장된 그래픽 없음.",
    },
    photoPile: {
      label: "쌓여 있는 여행 사진 비디오 프롬프트",
      alt: "점점 쌓여 가는 여행 사진 더미를 위한 비디오 생성 프롬프트.",
      shortHint: "가져오기 전, 섞여 있는 여행 사진.",
      prompt:
        "6초 길이의 상단 시점 영상. 한 번의 여행에서 찍은 여러 사진이 자연광 아래 테이블 위에 섞여 펼쳐져 있습니다. 솔직한 다큐멘터리 무드, 부드러운 움직임, 텍스트 오버레이 없음.",
    },
    batchImport: {
      label: "일괄 가져오기 선택 비디오 프롬프트",
      alt: "많은 여행 사진을 한 번에 선택하는 장면을 위한 비디오 생성 프롬프트.",
      shortHint: "사진 묶음을 한 번에 선택하는 프롬프트.",
      prompt:
        "6초 길이의 근접 제품 영상. 휴대폰 화면에서 여행 사진 여러 장을 한 번에 선택합니다. 부드러운 탭 동작, 깨끗하고 중립적인 UI, 차분한 에디토리얼 구도, 축하 효과 없음.",
    },
    timelineFormation: {
      label: "타임라인이 만들어지는 비디오 프롬프트",
      alt: "사진이 타임라인 모먼트로 묶이는 장면을 위한 비디오 생성 프롬프트.",
      shortHint: "사진이 묶여 모먼트가 됩니다.",
      prompt:
        "6초 길이의 전환 영상. 휴대폰 UI 안에 흩어져 있던 여행 사진이 시간과 장소 기준의 모먼트로 부드럽게 묶입니다. 읽기 쉬운 타임라인, 절제된 움직임, 조용한 시네마틱 톤.",
    },
    organizedResult: {
      label: "완성된 타임라인 상세 비디오 프롬프트",
      alt: "최종 정리된 타임라인 상세 화면을 위한 비디오 생성 프롬프트.",
      shortHint: "완성된 타임라인을 더 가까이 봅니다.",
      prompt:
        "6초 길이의 클로즈업 영상. 차분한 휴대폰 UI 안에서 완성된 여행 타임라인이 묶인 모먼트와 장소 라벨을 보여줍니다. 에디토리얼 조명, 소셜이나 생산성 모티프 없음.",
    },
  },
  ja: {
    resultOverview: {
      label: "整理された旅の概要ビデオプロンプト",
      alt: "完成した旅行タイムラインの概要向けビデオ生成プロンプト。",
      shortHint: "整理された結果を先に見せるタイムラインプロンプト。",
      prompt:
        "6秒のエディトリアルなプロダクト動画。1回の旅が時間と場所ごとの明確なタイムラインとして整理された画面を、スマートフォン越しにゆっくりドリーインで映します。やわらかなフォレストグリーンのUI、温かいサンドトーンの光、現実的な旅行写真、誇張したグラフィックなし。",
    },
    photoPile: {
      label: "積み重なる旅行写真のビデオプロンプト",
      alt: "増えていく旅行写真の束向けビデオ生成プロンプト。",
      shortHint: "取り込み前の混ざった旅行写真。",
      prompt:
        "6秒の俯瞰映像。1回の旅で撮った写真が自然光の入るテーブルに混ざって広がっています。率直なドキュメンタリームード、やわらかな動き、テキストオーバーレイなし。",
    },
    batchImport: {
      label: "一括取り込み選択のビデオプロンプト",
      alt: "多数の旅行写真を一度に選択する場面向けビデオ生成プロンプト。",
      shortHint: "写真の束をまとめて選ぶプロンプト。",
      prompt:
        "6秒の近接プロダクト動画。スマートフォンで旅行写真をまとめて一度に選択します。やさしいタップ動作、クリーンでニュートラルなUI、落ち着いたエディトリアル構図、祝福的な演出なし。",
    },
    timelineFormation: {
      label: "タイムラインが形になるビデオプロンプト",
      alt: "写真がタイムラインのモーメントへまとまる場面向けビデオ生成プロンプト。",
      shortHint: "写真がまとまりモーメントになります。",
      prompt:
        "6秒のトランジション動画。スマートフォンUIの中に散らばっていた旅行写真が、時間と場所ごとのモーメントへやわらかくまとまっていきます。読みやすいタイムライン、抑えた動き、静かなシネマティックトーン。",
    },
    organizedResult: {
      label: "完成したタイムライン詳細ビデオプロンプト",
      alt: "最終的に整理されたタイムライン詳細向けビデオ生成プロンプト。",
      shortHint: "完成したタイムラインを近くで見るプロンプト。",
      prompt:
        "6秒のクローズアップ動画。落ち着いたスマートフォンUIの中で、完成した旅のタイムラインがまとまったモーメントと場所ラベルを見せます。エディトリアルな照明、ソーシャルや生産性のモチーフなし。",
    },
  },
  zh: {
    resultOverview: {
      label: "整理后旅程总览视频提示词",
      alt: "用于已完成旅行时间线总览的视频生成提示词。",
      shortHint: "先展示整理结果的时间线提示词。",
      prompt:
        "6 秒编辑风格产品视频。镜头缓慢推进到手机画面，一段旅程已经按时间和地点整理成清晰时间线。柔和森林绿 UI，温暖沙色光线，真实旅行照片，没有夸张图形。",
    },
    photoPile: {
      label: "旅行照片堆积视频提示词",
      alt: "用于不断堆积的旅行照片的视频生成提示词。",
      shortHint: "导入前混在一起的旅行照片。",
      prompt:
        "6 秒俯拍视频。一趟旅行拍下的多张照片散落在自然光下的桌面上。真实纪实气氛，轻微动态，没有文字叠层。",
    },
    batchImport: {
      label: "批量导入选择视频提示词",
      alt: "用于一次选择多张旅行照片的视频生成提示词。",
      shortHint: "一次选择整组照片的提示词。",
      prompt:
        "6 秒近景产品视频。手机上一口气选择多张旅行照片。轻柔点击动作，干净中性的 UI，平静的编辑构图，没有庆祝式特效。",
    },
    timelineFormation: {
      label: "时间线成形视频提示词",
      alt: "用于照片整理成时间线时刻的视频生成提示词。",
      shortHint: "照片被整理成分组时刻。",
      prompt:
        "6 秒转场视频。手机 UI 里散开的旅行照片，逐渐按时间和地点柔和地聚成一个个时刻。时间线清晰可读，动作克制，氛围安静而有电影感。",
    },
    organizedResult: {
      label: "完成后的时间线细节视频提示词",
      alt: "用于最终整理完成的时间线细节视频生成提示词。",
      shortHint: "更近距离地看完成后的时间线。",
      prompt:
        "6 秒特写视频。平静的手机 UI 中，完成整理的旅程时间线展示分组时刻和地点标签。编辑风照明，没有社交或效率导向的视觉母题。",
    },
  },
  es: {
    resultOverview: {
      label: "Prompt de video del resumen del viaje organizado",
      alt: "Prompt de generación de video para el resumen de la línea de tiempo final del viaje.",
      shortHint: "Prompt centrado en el resultado final de la línea de tiempo.",
      prompt:
        "Video editorial de producto de 6 segundos. Un lento acercamiento hacia un teléfono que muestra un viaje organizado en una línea de tiempo clara por fecha y lugar, UI verde bosque suave, luz arena cálida, fotos de viaje realistas, sin gráficos exagerados.",
    },
    photoPile: {
      label: "Prompt de video de fotos de viaje acumuladas",
      alt: "Prompt de generación de video para una pila creciente de fotos de viaje.",
      shortHint: "Fotos de viaje mezcladas antes de importar.",
      prompt:
        "Video cenital de 6 segundos. Fotos mezcladas de un mismo viaje extendidas sobre una mesa con luz natural, tono documental honesto, movimiento suave, sin textos superpuestos.",
    },
    batchImport: {
      label: "Prompt de video de selección por lote",
      alt: "Prompt de generación de video para seleccionar muchas fotos de viaje a la vez.",
      shortHint: "Prompt de selección de importación por lote.",
      prompt:
        "Video de producto en primer plano de 6 segundos. Un teléfono selecciona muchas fotos del viaje de una vez, toque suave, UI limpia y neutra, encuadre editorial sereno, sin efectos de celebración.",
    },
    timelineFormation: {
      label: "Prompt de video de la línea de tiempo formándose",
      alt: "Prompt de generación de video para fotos que se agrupan en momentos de la línea de tiempo.",
      shortHint: "Las fotos se convierten en momentos agrupados.",
      prompt:
        "Video de transición de 6 segundos. Fotos dispersas de un viaje dentro de una UI de teléfono se agrupan suavemente en momentos por fecha y lugar, línea de tiempo legible, movimiento contenido, tono cinematográfico silencioso.",
    },
    organizedResult: {
      label: "Prompt de video de detalle de la línea de tiempo final",
      alt: "Prompt de generación de video para el detalle final de la línea de tiempo organizada.",
      shortHint: "Vista cercana de la línea de tiempo terminada.",
      prompt:
        "Video en primer plano de 6 segundos. La línea de tiempo final del viaje muestra momentos agrupados y etiquetas de lugares en una UI de teléfono tranquila, iluminación editorial, sin motivos sociales ni de productividad.",
    },
  },
  pt: {
    resultOverview: {
      label: "Prompt de vídeo da visão geral da viagem organizada",
      alt: "Prompt de geração de vídeo para a visão geral final da linha do tempo da viagem.",
      shortHint: "Prompt focado no resultado final da linha do tempo.",
      prompt:
        "Vídeo editorial de produto de 6 segundos. Um lento movimento de câmera se aproxima de um telefone mostrando uma viagem organizada em uma linha do tempo clara por tempo e lugar, UI verde floresta suave, luz quente de areia, fotos de viagem realistas, sem gráficos exagerados.",
    },
    photoPile: {
      label: "Prompt de vídeo de fotos de viagem se acumulando",
      alt: "Prompt de geração de vídeo para uma pilha crescente de fotos de viagem.",
      shortHint: "Fotos de viagem misturadas antes da importação.",
      prompt:
        "Vídeo superior de 6 segundos. Fotos misturadas de uma viagem espalhadas sobre uma mesa com luz natural, clima documental honesto, movimento suave, sem sobreposição de texto.",
    },
    batchImport: {
      label: "Prompt de vídeo da seleção em lote",
      alt: "Prompt de geração de vídeo para selecionar muitas fotos de viagem de uma vez.",
      shortHint: "Prompt de seleção para importação em lote.",
      prompt:
        "Vídeo de produto em close de 6 segundos. Um telefone seleciona muitas fotos da viagem de uma vez, toque suave, UI limpa e neutra, enquadramento editorial calmo, sem efeitos comemorativos.",
    },
    timelineFormation: {
      label: "Prompt de vídeo da linha do tempo ganhando forma",
      alt: "Prompt de geração de vídeo para fotos se agrupando em momentos da linha do tempo.",
      shortHint: "As fotos se tornam momentos agrupados.",
      prompt:
        "Vídeo de transição de 6 segundos. Fotos de viagem espalhadas dentro de uma UI de telefone se agrupam suavemente em momentos por tempo e lugar, linha do tempo legível, movimento contido, tom cinematográfico silencioso.",
    },
    organizedResult: {
      label: "Prompt de vídeo do detalhe da linha do tempo final",
      alt: "Prompt de geração de vídeo para o detalhe final da linha do tempo organizada.",
      shortHint: "Olhar mais de perto para a linha do tempo final.",
      prompt:
        "Vídeo em close de 6 segundos. A linha do tempo final da viagem mostra momentos agrupados e rótulos de lugares em uma UI de telefone calma, iluminação editorial, sem motivos sociais ou de produtividade.",
    },
  },
  fr: {
    resultOverview: {
      label: "Prompt vidéo de l'aperçu du voyage organisé",
      alt: "Prompt de génération vidéo pour l'aperçu final de la chronologie du voyage.",
      shortHint: "Prompt centré sur le résultat final de la chronologie.",
      prompt:
        "Vidéo produit éditoriale de 6 secondes. Lent travelling avant vers un téléphone montrant un voyage organisé en une chronologie claire par date et lieu, UI vert forêt doux, lumière sable chaude, photos de voyage réalistes, sans graphismes excessifs.",
    },
    photoPile: {
      label: "Prompt vidéo de photos de voyage qui s'accumulent",
      alt: "Prompt de génération vidéo pour une pile croissante de photos de voyage.",
      shortHint: "Photos de voyage mêlées avant l'import.",
      prompt:
        "Vidéo en vue de dessus de 6 secondes. Des photos mêlées d'un même voyage sont étalées sur une table à la lumière naturelle, ambiance documentaire sincère, mouvement doux, sans texte incrusté.",
    },
    batchImport: {
      label: "Prompt vidéo de sélection par lot",
      alt: "Prompt de génération vidéo pour sélectionner de nombreuses photos de voyage en une fois.",
      shortHint: "Prompt de sélection pour l'import par lot.",
      prompt:
        "Vidéo produit en gros plan de 6 secondes. Un téléphone sélectionne de nombreuses photos de voyage en une seule fois, geste tactile doux, UI propre et neutre, cadrage éditorial calme, sans effet de célébration.",
    },
    timelineFormation: {
      label: "Prompt vidéo de la chronologie qui prend forme",
      alt: "Prompt de génération vidéo pour des photos qui se regroupent en moments de chronologie.",
      shortHint: "Les photos deviennent des moments regroupés.",
      prompt:
        "Vidéo de transition de 6 secondes. Des photos de voyage éparses dans une UI de téléphone se regroupent doucement en moments selon le temps et le lieu, chronologie lisible, mouvement retenu, ton cinématographique calme.",
    },
    organizedResult: {
      label: "Prompt vidéo du détail final de la chronologie",
      alt: "Prompt de génération vidéo pour le détail final de la chronologie organisée.",
      shortHint: "Vue plus rapprochée de la chronologie finale.",
      prompt:
        "Vidéo en gros plan de 6 secondes. La chronologie finale du voyage montre des moments regroupés et des étiquettes de lieux dans une UI de téléphone calme, lumière éditoriale, sans motif social ni productiviste.",
    },
  },
  th: {
    resultOverview: {
      label: "พรอมต์วิดีโอภาพรวมทริปที่จัดแล้ว",
      alt: "พรอมต์สร้างวิดีโอสำหรับภาพรวมไทม์ไลน์การเดินทางที่จัดเสร็จแล้ว",
      shortHint: "พรอมต์ที่ให้เห็นผลลัพธ์ของไทม์ไลน์ก่อน",
      prompt:
        "วิดีโอโปรดักต์เชิงบรรณาธิการความยาว 6 วินาที กล้องค่อย ๆ ดอลลี่อินเข้าหาโทรศัพท์ที่แสดงทริปหนึ่งครั้งซึ่งถูกจัดเป็นไทม์ไลน์ที่ชัดเจนตามเวลาและสถานที่ UI สีเขียวป่าอ่อน แสงโทนทรายอุ่น ภาพถ่ายทริปสมจริง ไม่มีกราฟิกหวือหวา",
    },
    photoPile: {
      label: "พรอมต์วิดีโอรูปทริปที่กองสะสม",
      alt: "พรอมต์สร้างวิดีโอสำหรับกองรูปทริปที่เพิ่มขึ้นเรื่อย ๆ",
      shortHint: "รูปทริปที่ปะปนกันก่อนนำเข้า",
      prompt:
        "วิดีโอมุมมองจากด้านบนความยาว 6 วินาที รูปจากทริปเดียวกันหลายใบกระจายอยู่บนโต๊ะใต้แสงธรรมชาติ อารมณ์แบบสารคดีตรงไปตรงมา การเคลื่อนไหวนุ่มนวล ไม่มีข้อความซ้อนบนภาพ",
    },
    batchImport: {
      label: "พรอมต์วิดีโอการเลือกนำเข้าแบบชุด",
      alt: "พรอมต์สร้างวิดีโอสำหรับการเลือกหลายรูปทริปพร้อมกันในครั้งเดียว",
      shortHint: "พรอมต์การเลือกนำเข้ารูปทั้งชุด",
      prompt:
        "วิดีโอโปรดักต์ระยะใกล้ความยาว 6 วินาที โทรศัพท์เลือกหลายรูปทริปพร้อมกันในครั้งเดียว จังหวะแตะอย่างนุ่มนวล UI สะอาดเป็นกลาง องค์ประกอบภาพเชิงบรรณาธิการที่สงบ ไม่มีเอฟเฟ็กต์เฉลิมฉลอง",
    },
    timelineFormation: {
      label: "พรอมต์วิดีโอไทม์ไลน์ก่อรูป",
      alt: "พรอมต์สร้างวิดีโอสำหรับภาพถ่ายที่ค่อย ๆ ถูกรวมเป็นช่วงเวลาในไทม์ไลน์",
      shortHint: "รูปถูกจัดเป็นช่วงเวลาที่อยู่ด้วยกัน",
      prompt:
        "วิดีโอทรานซิชันความยาว 6 วินาที รูปทริปที่กระจัดกระจายใน UI ของโทรศัพท์ค่อย ๆ ถูกรวมเป็นช่วงเวลาตามเวลาและสถานที่ ไทม์ไลน์อ่านง่าย การเคลื่อนไหวพอดี โทนภาพยนตร์ที่เงียบสงบ",
    },
    organizedResult: {
      label: "พรอมต์วิดีโอรายละเอียดไทม์ไลน์ที่จัดเสร็จแล้ว",
      alt: "พรอมต์สร้างวิดีโอสำหรับรายละเอียดสุดท้ายของไทม์ไลน์ที่จัดเสร็จแล้ว",
      shortHint: "มองไทม์ไลน์ที่เสร็จแล้วใกล้ขึ้น",
      prompt:
        "วิดีโอคลोजอัปความยาว 6 วินาที ไทม์ไลน์ทริปที่จัดเสร็จแล้วแสดงช่วงเวลาที่ถูกรวมและป้ายชื่อสถานที่ใน UI โทรศัพท์ที่สงบ แสงเชิงบรรณาธิการ ไม่มีภาพจำแบบโซเชียลหรือประสิทธิภาพการทำงาน",
    },
  },
  vi: {
    resultOverview: {
      label: "Prompt video tổng quan hành trình đã sắp xếp",
      alt: "Prompt tạo video cho tổng quan dòng thời gian chuyến đi đã hoàn thành.",
      shortHint: "Prompt ưu tiên hiện kết quả của dòng thời gian.",
      prompt:
        "Video sản phẩm theo phong cách biên tập dài 6 giây. Máy quay tiến chậm vào một điện thoại đang hiện một chuyến đi được sắp xếp thành dòng thời gian rõ ràng theo thời gian và địa điểm, UI xanh rừng nhẹ, ánh sáng tông cát ấm, ảnh du lịch chân thật, không có đồ họa phấn khích.",
    },
    photoPile: {
      label: "Prompt video ảnh chuyến đi đang dồn lại",
      alt: "Prompt tạo video cho một đống ảnh du lịch đang tăng lên.",
      shortHint: "Ảnh du lịch lộn xộn trước khi nhập.",
      prompt:
        "Video góc nhìn từ trên cao dài 6 giây. Nhiều ảnh từ một chuyến đi được trải trên bàn dưới ánh sáng tự nhiên, không khí tài liệu chân thật, chuyển động nhẹ, không có chữ đè lên hình.",
    },
    batchImport: {
      label: "Prompt video chọn nhập hàng loạt",
      alt: "Prompt tạo video cho cảnh chọn nhiều ảnh du lịch cùng một lúc.",
      shortHint: "Prompt chọn cả lô ảnh để nhập.",
      prompt:
        "Video cận cảnh sản phẩm dài 6 giây. Một điện thoại chọn nhiều ảnh chuyến đi cùng một lúc, thao tác chạm nhẹ, UI sạch và trung tính, bố cục biên tập điềm tĩnh, không có hiệu ứng ăn mừng.",
    },
    timelineFormation: {
      label: "Prompt video dòng thời gian dần thành hình",
      alt: "Prompt tạo video cho cảnh ảnh được gom thành các khoảnh khắc trên dòng thời gian.",
      shortHint: "Ảnh trở thành các khoảnh khắc được nhóm lại.",
      prompt:
        "Video chuyển cảnh dài 6 giây. Các ảnh chuyến đi rời rạc bên trong UI điện thoại được gom nhẹ thành các khoảnh khắc theo thời gian và địa điểm, dòng thời gian dễ đọc, chuyển động tiết chế, sắc thái điện ảnh yên lặng.",
    },
    organizedResult: {
      label: "Prompt video chi tiết dòng thời gian hoàn chỉnh",
      alt: "Prompt tạo video cho chi tiết cuối cùng của dòng thời gian đã sắp xếp.",
      shortHint: "Xem cận cảnh hơn dòng thời gian đã hoàn thành.",
      prompt:
        "Video cận cảnh dài 6 giây. Dòng thời gian chuyến đi đã hoàn thành hiện các khoảnh khắc được nhóm và nhãn địa điểm trong một UI điện thoại tĩnh lặng, ánh sáng theo phong cách biên tập, không có mô típ mạng xã hội hay năng suất.",
    },
  },
};

export function getHomeMarketingImagePrompt(
  key: HomeMarketingImagePromptKey,
  lang: Language = "en",
): HomeMarketingImagePrompt {
  return HOME_MARKETING_IMAGE_PROMPTS[lang]?.[key] ?? HOME_MARKETING_IMAGE_PROMPTS.en[key];
}
