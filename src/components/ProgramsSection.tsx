import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import "../styles/ProgramsSection.css";
import nutrition01 from "../assets/images/nutrition01.jpg";
import nutrition02 from "../assets/images/nutrition02.jpg";
import nutrition03 from "../assets/images/nutrition03.jpg";
import nutrition04 from "../assets/images/nutrition04.jpg";
import workout01 from "../assets/images/workout01.jpg";
import workout02 from "../assets/images/workout02.jpg";
import workout03 from "../assets/images/workout03.png";
import workout04 from "../assets/images/workout04.png";
import ProgramCard, { type Program } from "./ProgramCard";

const nutritionPrograms: Program[] = [
  {
    title: "وقود زيادة نظيفة",
    description: "هيكلة عالية البروتين مع كربوهيدرات ذكية وتحضير أسبوعي.",
    fullDescription:
      "دليل كامل لزيادة نظيفة يشمل جدول وجبات يومي، توزيع الماكروز، قائمة مشتريات، وخيارات بديلة سريعة لكل وجبة بدون تعقيد.",
    tags: ["٤ أسابيع", "حسب الماكروز", "تحضير وجبات"],
    image: nutrition01,
  },
  {
    title: "إعادة ضبط خسارة الدهون",
    description: "تدوير السعرات، التحكم في الشهية، وتعافٍ سريع.",
    fullDescription:
      "خطة تنشيف تدريجية مع إعادة تغذية محسوبة وتتبع وزن أسبوعي، ونظام وجبات منخفض الجهد يحافظ على الشبع ويثبت الأداء.",
    tags: ["مرحلة تنشيف", "بروتين عالٍ", "ضغط منخفض"],
    image: nutrition02,
  },
  {
    title: "وقود الأداء",
    description: "وجبات بتوقيت دقيق لأيام التدريب والراحة.",
    fullDescription:
      "برنامج توقيت كارب وبروتين حول التمرين، توزيع وجبات لأيام الراحة، وإرشادات ترطيب ومكملات أساسية لرفع الأداء.",
    tags: ["رياضي", "توقيت", "ترطيب"],
    image: nutrition03,
  },
  {
    title: "قوة نباتية",
    description: "بروتينات كاملة مع بدائل سهلة ووصفات بسيطة.",
    fullDescription:
      "دليل نباتي عملي لبناء العضلات يتضمن مصادر بروتين كاملة، دمج أحماض أمينية، ووصفات خفيفة على المعدة.",
    tags: ["نباتي", "مناسب للمعدة", "بسيط"],
    image: nutrition04,
  },
];

const splitPrograms: Program[] = [
  {
    title: "٤ أيام علوي / سفلي",
    description: "توازن بين القوة والضخامة مع تعافٍ مدمج.",
    fullDescription:
      "جدول أسبوعي مفصل بالحجم والشدة، تقسيم عضلات واضح، وتمارين بديلة مع أسبوع تخفيف دوري للحفاظ على التعافي.",
    tags: ["متوسط", "٤ أيام", "قوة"],
    image: workout01,
  },
  {
    title: "دفع / سحب / أرجل",
    description: "تقسيمة كلاسيكية لزيادة الحجم والكثافة.",
    fullDescription:
      "خطة تضخيم كلاسيكية مع تقدم بالأوزان، توزيع أحمال متوازن، وتمارين دعم لتقوية نقاط الضعف على المدى الطويل.",
    tags: ["ضخامة", "٥-٦ أيام", "حجم"],
    image: workout02,
  },
  {
    title: "٣ أيام جسم كامل",
    description: "تمارين جسم كامل بكفاءة لأسابيع الانشغال.",
    fullDescription:
      "برنامج مختصر يحافظ على القوة في أسابيع الانشغال، يعتمد على تمارين مركبة وإحماء سريع وخطة تقدّم بسيطة.",
    tags: ["مبتدئ", "٣ أيام", "موفّر للوقت"],
    image: workout03,
  },
  {
    title: "تقسيمة القوة الرياضية",
    description: "قوة وسرعة ولياقة في نظام واحد.",
    fullDescription:
      "نظام أداء يجمع السرعة والقوة الانفجارية مع لياقة وظيفية، ويحدد بوضوح أيام الشدة العالية والمتوسطة.",
    tags: ["أداء", "٥ أيام", "انفجارية"],
    image: workout04,
  },
];

function ProgramsSection() {
  const programsRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftColumnRef = useRef<HTMLDivElement | null>(null);
  const rightColumnRef = useRef<HTMLDivElement | null>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggleCard = useCallback((key: string) => {
    setExpandedCard((prev) => (prev === key ? null : key));
  }, []);

  const programsTitle = "برامج مجانية !";
  const programsTitleWords = useMemo(
    () => programsTitle.split(/\s+/),
    [programsTitle],
  );
  const wordDelayMs = 45;

  useEffect(() => {
    const section = programsRef.current;
    if (!section) return;

    const triggerAnimation = () => {
      section.classList.add("programs-section--animate");
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(section);
      return () => observer.disconnect();
    }

    triggerAnimation();
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTitleVisible(true);
          }
        },
        { threshold: 0.3 },
      );
      observer.observe(title);
      return () => observer.disconnect();
    }

    const onScroll = () => {
      const rect = title.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        setTitleVisible(true);
      }
    };

    const win = window as Window;
    onScroll();
    win.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");

    const left = leftColumnRef.current;
    const right = rightColumnRef.current;
    if (!left || !right) return;

    const setVisible = (element: HTMLElement) => {
      element.classList.add("programs-column--visible");
    };

    const checkInView = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
    };

    if (!media.matches) {
      setVisible(left);
      setVisible(right);
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setVisible(entry.target as HTMLElement);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
      );
      observer.observe(left);
      observer.observe(right);

      const handleMediaChange = () => {
        if (!media.matches) {
          setVisible(left);
          setVisible(right);
          observer.disconnect();
          return;
        }
        if (checkInView(left)) setVisible(left);
        if (checkInView(right)) setVisible(right);
      };
      handleMediaChange();
      media.addEventListener("change", handleMediaChange);
      return () => {
        observer.disconnect();
        media.removeEventListener("change", handleMediaChange);
      };
    }

    const onScroll = () => {
      if (!media.matches) {
        setVisible(left);
        setVisible(right);
        return;
      }
      if (checkInView(left)) setVisible(left);
      if (checkInView(right)) setVisible(right);
    };

    const win = window as Window;
    onScroll();
    win.addEventListener("scroll", onScroll, { passive: true });
    win.addEventListener("resize", onScroll);
    return () => {
      win.removeEventListener("scroll", onScroll);
      win.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={programsRef}
      className="programs-section about"
      id="programs"
      aria-labelledby="programs-title"
      dir="rtl"
    >
      <div className="programs-inner relative z-[1] mx-auto flex w-[min(1200px,calc(100%-48px))] flex-col gap-9">
        <h1 id="programs-title" ref={titleRef} className="programs-title">
          {programsTitleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={`about-intro-word ${
                titleVisible ? "about-intro-word--visible" : ""
              }`}
              style={{
                transitionDelay: `${index * wordDelayMs}ms`,
                animationDelay: `${index * wordDelayMs}ms`,
              }}
            >
              {word}
              {index < programsTitleWords.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </h1>
        <div className="flex flex-col">
          <div className="programs-columns grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div
              ref={leftColumnRef}
              className="programs-column flex flex-col gap-3 text-right programs-column--left"
            >
              <h2 className="programs-column-title">تقسيمات التمرين</h2>
              <div className="programs-stack relative flex flex-col items-stretch overflow-visible isolate">
                {splitPrograms.map((program, index) => (
                  <ProgramCard
                    key={`split-${program.title}`}
                    program={program}
                    index={index}
                    stackIndex={index * -1}
                    stackZ={splitPrograms.length - index}
                    revealDelayMs={index * 80}
                    expanded={expandedCard === `split-${program.title}`}
                    onToggle={() => handleToggleCard(`split-${program.title}`)}
                  />
                ))}
              </div>
            </div>
            <div
              ref={rightColumnRef}
              className="programs-column flex flex-col gap-3 text-right programs-column--right"
            >
              <h2 className="programs-column-title">دليل التغذية</h2>
              <div
                className="programs-stack relative flex flex-col items-stretch overflow-visible isolate"
                style={
                  {
                    "--stack-pad": `${(nutritionPrograms.length - 1) * 28}px`,
                  } as CSSProperties
                }
              >
                {nutritionPrograms.map((program, index) => (
                  <ProgramCard
                    key={`nutrition-${program.title}`}
                    program={program}
                    index={index}
                    stackIndex={index}
                    stackZ={nutritionPrograms.length - index}
                    revealDelayMs={index * 80}
                    expanded={expandedCard === `nutrition-${program.title}`}
                    onToggle={() =>
                      handleToggleCard(`nutrition-${program.title}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="programs-cta">
        <a
          href="#contact"
          className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-head-btn px-10 py-3 text-lg font-bold tracking-[0.02em] text-text-dark shadow-[0_14px_30px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(0,0,0,0.32)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main-bleu/70"
        >
          ابدأ برنامجك الآن
        </a>
      </div>
    </section>
  );
}

export default memo(ProgramsSection);
