export const courses = [
  {
    id: "2k-prep",
    title: "2K Preparation for Dev",
    sessions: 7,
    shortDescription:
      "Chuẩn bị kỹ năng và hồ sơ ứng tuyển với mức lương từ 2,000 USD / tháng. Học phí niêm yết là chi phí cơ bản.",
    price: 2000000,
    icon: "2K",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học tập trung vào chuẩn hóa nền tảng kỹ thuật và chuẩn bị hồ sơ/phỏng vấn để hướng đến mức lương 2,000 USD/tháng. Lộ trình thiết kế theo hướng thực chiến với bài tập bám sát nhu cầu tuyển dụng.",
        "Trong 7 buổi, bạn sẽ tối ưu CV, luyện thuật toán/DSA vừa đủ, cải thiện dự án cá nhân, chuẩn bị behavioral interview và hệ thống hóa kiến thức nền tảng.",
        "Mentor đồng hành review CV, mock interview, góp ý portfolio và kế hoạch ứng tuyển."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1: Đánh giá năng lực, mục tiêu, roadmap 2K.",
        "Buổi 2: CV/LinkedIn/Portfolio, chuẩn hóa dự án.",
        "Buổi 3: DSA nền tảng & cách luyện hiệu quả.",
        "Buổi 4: System thinking cơ bản & câu hỏi thường gặp.",
        "Buổi 5: Mock interview (technical).",
        "Buổi 6: Mock interview (behavioral) + case study.",
        "Buổi 7: Chiến lược ứng tuyển & follow-up."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "git-foundation",
    title: "Git Foundation",
    sessions: 2,
    shortDescription:
      "Git Foundation là khóa học nền tảng giúp người học làm quen và nắm vững các khái niệm cơ bản nhất về Git.",
    price: 500000,
    icon: "Git",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Git Foundation giúp bạn hiểu cách Git hoạt động, thao tác commit/branch/merge đúng chuẩn và xử lý các tình huống thường gặp khi làm việc nhóm.",
        "Bạn sẽ nắm được workflow phổ biến (feature branch, pull request), cách giải quyết conflict, và cách viết commit message dễ đọc."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1: Git basics, commit, branch, merge, remote.",
        "Buổi 2: Workflow nhóm, pull request, conflict, rebase (cơ bản)."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "angular-beginner",
    title: "Angular căn bản cho Beginner",
    sessions: 15,
    shortDescription:
      "Angular là framework của Google, được enterprise và công ty lớn lựa chọn vì kiến trúc rõ ràng, TypeScript mạnh mẽ.",
    price: 10000000,
    icon: "A",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Angular là framework của Google, được enterprise và công ty lớn lựa chọn vì kiến trúc rõ ràng, TypeScript mạnh mẽ. Khác với React dễ bắt đầu nhưng khó scale, Angular có structure chặt chẽ ngay từ đầu, giúp maintain dễ dàng khi project phình to.",
        "Sau 15 buổi học, bạn sẽ build Single Page Application chuyên nghiệp với Angular: component architecture, data binding, directives/pipes, routing & lazy loading, reactive forms, gọi API với HttpClient và xử lý async bằng RxJS.",
        "Khóa học phù hợp cho người đã có nền tảng HTML/CSS/JS và muốn đi sâu vào frontend theo hướng enterprise."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 2: TypeScript, setup, Angular CLI.",
        "Buổi 3 - 4: Component, template, data binding.",
        "Buổi 5 - 6: Services, DI, HttpClient.",
        "Buổi 7 - 8: Router, lazy loading, guard.",
        "Buổi 9 - 10: Reactive Forms, validation.",
        "Buổi 11 - 12: RxJS cơ bản, async patterns.",
        "Buổi 13 - 14: Best practices, structure production.",
        "Buổi 15: Tổng kết & review project."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "flutter-beginner",
    title: "Flutter căn bản cho Beginner",
    sessions: 15,
    shortDescription:
      "Flutter giải quyết: code một lần, chạy trên cả iOS và Android. Phù hợp cho người muốn làm app mobile.",
    price: 10000000,
    icon: "F",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Flutter giúp bạn xây dựng ứng dụng mobile cross-platform với hiệu năng tốt và UI đẹp. Bạn sẽ nắm widget, state management cơ bản và build app hoàn chỉnh.",
        "Trong 15 buổi, bạn sẽ làm quen Dart, layout, navigation, gọi API, lưu trữ dữ liệu, và triển khai ứng dụng."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 2: Dart cơ bản, setup Flutter.",
        "Buổi 3 - 5: Widgets, layout, styling.",
        "Buổi 6 - 8: Navigation, state (cơ bản).",
        "Buổi 9 - 11: API, async, error handling.",
        "Buổi 12 - 14: Local storage, architecture.",
        "Buổi 15: Demo & review project."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "dl-cv",
    title: "Deep Learning & Computer Vision",
    sessions: 15,
    shortDescription:
      "Computer Vision đang ở khắp mọi nơi: Face ID, camera an ninh, xe tự lái, TikTok/Instagram filters...",
    price: 10000000,
    icon: "DL",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học giới thiệu nền tảng Deep Learning và các bài toán Computer Vision phổ biến: classification, detection, segmentation.",
        "Bạn sẽ thực hành pipeline dữ liệu, training/evaluation và triển khai demo nhỏ."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: Nền tảng DL, backprop, optimizer.",
        "Buổi 4 - 6: CNN, augmentation, evaluation.",
        "Buổi 7 - 9: Detection/Segmentation (overview).",
        "Buổi 10 - 12: Transfer learning, fine-tuning.",
        "Buổi 13 - 15: Project & demo."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "nestjs-basic",
    title: "Backend với NestJS (Cơ bản)",
    sessions: 15,
    shortDescription:
      "NestJS là framework backend TypeScript được thiết kế với kiến trúc rõ ràng, dễ maintain và scale.",
    price: 9500000,
    icon: "N",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "NestJS là Node.js framework theo kiến trúc module, phù hợp để xây dựng API có cấu trúc, dễ mở rộng. Bạn sẽ học controllers, services, providers, validation, auth cơ bản và làm việc với database.",
        "Kết thúc khóa, bạn có thể tự dựng backend chuẩn production và biết cách tổ chức codebase."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: Module/controller/service, DI.",
        "Buổi 4 - 6: Validation, pipes, exception filters.",
        "Buổi 7 - 9: Auth cơ bản, guard, JWT overview.",
        "Buổi 10 - 12: DB integration (overview).",
        "Buổi 13 - 15: Project & best practices."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "db-data-engineering",
    title: "Cơ sở dữ liệu & Data Engineering",
    sessions: 12,
    shortDescription:
      "Database là nền tảng của mọi ứng dụng - từ web app đơn giản đến hệ thống enterprise phức tạp.",
    price: 8000000,
    icon: "DB",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Bạn sẽ nắm các khái niệm cơ bản về database, thiết kế schema, index, query optimization và workflow data pipeline ở mức nhập môn.",
        "Khóa học phù hợp cho dev muốn hiểu sâu về dữ liệu để thiết kế hệ thống tốt hơn."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: Relational DB, schema, normalization.",
        "Buổi 4 - 6: Index, query, optimization.",
        "Buổi 7 - 9: ETL basics, data pipeline overview.",
        "Buổi 10 - 12: Project & case study."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "llm-genai-beginner",
    title: "LLM & Generative AI cho Beginner",
    sessions: 15,
    shortDescription:
      "ChatGPT đã thay đổi game hoàn toàn. Biết cách làm việc với LLMs là kỹ năng không thể thiếu.",
    price: 10000000,
    icon: "AI",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học giúp bạn hiểu LLM là gì, cách prompt hiệu quả, RAG overview, và xây dựng demo ứng dụng GenAI đơn giản.",
        "Bạn sẽ thực hành các bài tập theo hướng ứng dụng: chat bot, tóm tắt, trích xuất thông tin."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: LLM fundamentals, prompt patterns.",
        "Buổi 4 - 6: Tooling & evaluation overview.",
        "Buổi 7 - 9: Embeddings, RAG overview.",
        "Buổi 10 - 12: Demo app & guardrails basics.",
        "Buổi 13 - 15: Project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "devops-beginner",
    title: "DevOps cơ bản cho Beginner",
    sessions: 15,
    shortDescription:
      "DevOps là cầu nối giúp developer đưa sản phẩm từ localhost lên production một cách chuyên nghiệp.",
    price: 10000000,
    icon: "⚙",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Bạn sẽ hiểu CI/CD, container, deploy cơ bản và cách vận hành ứng dụng nhỏ trên môi trường production.",
        "Khóa học tập trung vào tư duy và các công cụ phổ biến để bạn có thể tự tin triển khai dự án."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: Linux basics, networking basics.",
        "Buổi 4 - 6: Docker, image, compose.",
        "Buổi 7 - 9: CI/CD overview, pipelines.",
        "Buổi 10 - 12: Deploy strategies, monitoring basics.",
        "Buổi 13 - 15: Project deploy & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "nextjs-15-beginner",
    title: "Next.js 15 cho Người mới bắt đầu",
    sessions: 12,
    shortDescription:
      "Next.js là React framework mạnh nhất hiện nay, được Vercel phát triển và dùng bởi hàng triệu developers.",
    price: 10000000,
    icon: "Nx",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Bạn sẽ học Next.js theo hướng thực hành: routing, data fetching, UI patterns và triển khai.",
        "Kết thúc khóa, bạn có thể xây dựng web app hiện đại với SEO tốt và hiệu năng cao."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: App Router, layouts, routing.",
        "Buổi 4 - 6: Data fetching, caching overview.",
        "Buổi 7 - 9: Forms, auth overview.",
        "Buổi 10 - 12: Deploy & project review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "oop",
    title: "Lập trình Hướng Đối Tượng",
    sessions: 10,
    shortDescription:
      "OOP là paradigm lập trình quan trọng nhất trong phát triển phần mềm hiện đại.",
    price: 7000000,
    icon: "OOP",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học giúp bạn hiểu sâu OOP: class/object, encapsulation, inheritance, polymorphism, SOLID ở mức nhập môn.",
        "Bạn sẽ luyện thiết kế class, refactor code và áp dụng vào bài tập."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 2: OOP fundamentals, class/object.",
        "Buổi 3 - 4: Encapsulation, abstraction.",
        "Buổi 5 - 6: Inheritance, polymorphism.",
        "Buổi 7 - 8: SOLID overview.",
        "Buổi 9 - 10: Mini project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "intro-programming",
    title: "Nhập môn lập trình",
    sessions: 10,
    shortDescription:
      "Lập trình là kỹ năng cốt lõi của thế kỷ 21, giúp bạn tư duy logic và giải quyết vấn đề tốt hơn.",
    price: 7000000,
    icon: "</>",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa nhập môn giúp bạn làm quen tư duy lập trình, biến/điều kiện/vòng lặp/hàm và cách giải bài toán cơ bản.",
        "Phù hợp cho người mới bắt đầu muốn có nền tảng vững trước khi chọn chuyên ngành."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 2: Tư duy lập trình, biến, kiểu dữ liệu.",
        "Buổi 3 - 4: Điều kiện, vòng lặp.",
        "Buổi 5 - 6: Hàm, mảng, string basics.",
        "Buổi 7 - 8: Debugging, bài tập tổng hợp.",
        "Buổi 9 - 10: Mini project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "ml-dummy",
    title: "Machine Learning cho Dummy",
    sessions: 12,
    shortDescription:
      "Machine Learning là nền tảng của AI hiện đại, giúp máy tính học từ dữ liệu.",
    price: 10000000,
    icon: "ML",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học giúp bạn nắm kiến thức ML căn bản: supervised/unsupervised, regression/classification, đánh giá mô hình.",
        "Bạn sẽ thực hành xây dựng model nhỏ và hiểu cách chọn feature, xử lý dữ liệu."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 3: ML overview, data prep basics.",
        "Buổi 4 - 6: Regression/classification.",
        "Buổi 7 - 9: Metrics, validation, overfitting.",
        "Buổi 10 - 12: Mini project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "python-ai",
    title: "Python A-Z cho AI Developer",
    sessions: 7,
    shortDescription:
      "Python là ngôn ngữ số 1 cho AI/ML nhờ syntax đơn giản và hệ sinh thái thư viện phong phú.",
    price: 8000000,
    icon: "Py",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Bạn sẽ học Python theo hướng phục vụ AI/ML: syntax, data structures, numpy/pandas overview và workflow notebook.",
        "Khóa học phù hợp cho người mới muốn bắt đầu hành trình AI."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1: Python basics.",
        "Buổi 2: Data structures, functions.",
        "Buổi 3: File I/O, modules.",
        "Buổi 4: Numpy overview.",
        "Buổi 5: Pandas overview.",
        "Buổi 6: Visualization basics.",
        "Buổi 7: Mini project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  },
  {
    id: "firebase-dev",
    title: "Firebase For Developer",
    sessions: 9,
    shortDescription:
      "Firebase là Backend-as-a-Service (BaaS) của Google, giúp xây dựng app nhanh với auth, database, storage.",
    price: 6000000,
    icon: "🔥",
    categoryBadge: { label: "Học viên", tone: "emerald" },
    detail: {
      overviewTitle: "Mô tả khóa học",
      overviewParagraphs: [
        "Khóa học giúp bạn nắm Firebase cơ bản: Auth, Firestore, Storage và cách tích hợp vào web/app.",
        "Bạn sẽ build demo end-to-end và hiểu best practices cho dự án nhỏ."
      ],
      syllabusTitle: "Chương trình học",
      syllabusItems: [
        "Buổi 1 - 2: Firebase project, Auth basics.",
        "Buổi 3 - 5: Firestore, queries, rules overview.",
        "Buổi 6 - 7: Storage, upload/download.",
        "Buổi 8 - 9: Project & review."
      ]
    },
    meta: {
      delivery: "Linh hoạt tuỳ ý",
      offlineAddress: "181 Cao Thắng, Phường 12, Quận 10, TP HCM",
      instructors: 0,
      students: 0,
      status: "Đang mở"
    }
  }
];

export function formatPriceVND(n) {
  return new Intl.NumberFormat("vi-VN").format(n) + " ₫";
}

export function getCourseById(id) {
  return courses.find((c) => c.id === id);
}

