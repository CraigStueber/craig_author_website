import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Professional resume of Craig A. Stueber, Lead Forward Deployed Engineer, Applied AI Engineer, software engineer, and doctoral researcher.",
};

const experience = [
  {
    company: "Cigna Healthcare",
    location: "Remote",
    dates: "June 2026 – Present",
    title: "Lead Forward Deployed Engineer",
    note: "Contract",
    bullets: [
      "Lead a team of Forward Deployed Engineers building an enterprise AI agent marketplace, giving Cigna employees a centralized platform to discover and access approved AI agents, MCPs, tools, and internal AI capabilities.",
      "Architect integrations spanning 12+ programming languages and technology stacks, unifying fragmented AI tooling into a single enterprise marketplace and source of truth.",
      "Partner with engineering teams and internal stakeholders across the enterprise to standardize how AI tools are surfaced, integrated, documented, and made available for employee use.",
    ],
  },
  {
    company: "Berkshire Hathaway Energy",
    location: "Richmond, VA",
    dates: "Jan 2025 – June 2026",
    title: "Senior Full Stack Engineer, AI Systems Integration",
    bullets: [
      "Led a team of 6 engineers building a next-generation enterprise platform managing natural gas scheduling and operational workflows, transitioning $100B+ in annual energy movement from on-prem to cloud.",
      "Built and owned full-stack features end to end using Next.js, Java, MongoDB, and Azure to support gas flow scheduling, hourly quantity tracking, critical notices, and user preferences, saving the company 10K+ hours monthly on operations.",
      "Managed an early-stage R&D initiative and designed a 6-agent LangGraph pipeline for enterprise data understanding, decreasing business stakeholder analysis time by 90%.",
      "Architected LangSmith-based evaluation pipelines to detect LLM behavioral regressions before model or prompt updates, decreasing debugging times by 80%.",
      "Gathered requirements from business stakeholders and end users, presented architectural progress to leadership, and justified tradeoff decisions, delivering the project 25% earlier and saving $600K on expenses.",
      "Led enterprise-wide GitHub Copilot deployment across 200+ engineers and established behavioral guardrails and governance practices to reduce AI-introduced defects in production codebases.",
    ],
  },
  {
    company: "Sauer Brands",
    location: "Richmond, VA",
    dates: "Oct 2021 – Jan 2025",
    title: "Software Engineer, LLM Integrated",
    bullets: [
      "Served as sole engineer across 6 independent brand teams and built customer-facing applications from 0 to 1 in direct collaboration with brand managers and third-party marketing partners, delivering 140+ features.",
      "Designed, shipped, and owned full product delivery for consumer-facing React and Supabase applications across 6 brands, including a voting platform with 30K+ active users, event discovery, fan engagement tools, sweepstakes systems, and e-commerce storefronts.",
      "Built LLM-integrated pipelines for classification, summarization, automated routing, data ingestion, caching, PostgreSQL and Redis retrieval layers, and controlled prompt A/B evaluations, saving the IT team 180+ hours monthly on customer processing and analysis.",
    ],
  },
  {
    company: "Talos IoT",
    location: "Richmond, VA",
    dates: "Jan 2021 – Oct 2021",
    title: "Full Stack Engineer, ML-Enhanced",
    bullets: [
      "Integrated ML models for time-series anomaly detection and classification into backend services to identify sensor abnormalities and operational risks.",
      "Built real-time IoT monitoring dashboards with React, Python, and WebSockets and translated ML outputs into actionable insights for technicians and field operators.",
    ],
  },
  {
    company: "Kurb Media",
    location: "Richmond, VA",
    dates: "Jul 2019 – Jan 2021",
    title: "Front-End Engineer",
    bullets: [
      "Delivered 50+ client projects across React, PHP, WordPress, Shopify, and vanilla HTML while managing requirements, tradeoffs, and delivery timelines with stakeholders, delivering 100% of client projects on time.",
    ],
  },
  {
    company: "Freelance",
    location: "Richmond, VA",
    dates: "Jun 2017 – Jul 2019",
    title: "Front-End Engineer",
    bullets: [
      "Built and delivered 10+ full-stack web applications for clients in the publishing, real estate, and nonprofit industries while owning requirements, scoping, and delivery, securing 100% of clients through word-of-mouth referrals.",
    ],
  },
];

const skillGroups = [
  {
    title: "AI Systems",
    skills: [
      "LLM Pipelines",
      "Agentic Workflow Design",
      "MCP",
      "Prompt Architecture",
      "Constrained Generation",
      "RAG & Vector Search",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "LangSmith",
    ],
  },
  {
    title: "Languages & Frameworks",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "Tailwind",
      "React",
      "Next.js",
      "Node.js",
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "REST APIs",
      "Azure",
      "Cloudflare Workers",
      "Supabase",
    ],
  },
];

export default function ResumePage() {
  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Resume</p>

          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.heading}>
                Engineering systems from idea to production.
              </h1>

              <p className={styles.summary}>
                Lead Forward Deployed Engineer and Applied AI Engineer with 10+
                years of experience building and shipping production systems end
                to end in complex enterprise environments.
              </p>
            </div>

            <div className={styles.contact}>
              <p>San Diego, CA</p>

              <a href="mailto:craigstueber@gmail.com">CraigStueber@gmail.com</a>

              <a
                href="https://www.linkedin.com/in/craigstueber"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <Link href="/contact">Contact Me</Link>
            </div>
          </div>

          <div className={styles.summaryDetail}>
            <p>
              I own the full lifecycle of AI in production, from ambiguous
              operational requirements through architecture, integration,
              evaluation, and deployment. My work focuses on turning fragmented
              enterprise systems into reliable AI products and platforms.
            </p>

            <p>
              I am also a doctoral researcher in AI safety, focused on why AI
              systems break in real deployments and how to build systems that
              don&apos;t.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Experience</p>
            <h2>Professional Experience</h2>
          </div>

          <div className={styles.experience}>
            {experience.map((role) => (
              <article
                key={`${role.company}-${role.dates}`}
                className={styles.role}
              >
                <div className={styles.roleMeta}>
                  <p className={styles.dates}>{role.dates}</p>
                  <p className={styles.location}>{role.location}</p>
                </div>

                <div className={styles.roleContent}>
                  <p className={styles.company}>{role.company}</p>

                  <h3>{role.title}</h3>

                  {role.note && <p className={styles.roleNote}>{role.note}</p>}

                  <ul>
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.altSection}>
        <Container>
          <div className={styles.twoColumnHeader}>
            <div>
              <p className={styles.eyebrow}>Selected Project</p>
              <h2>CodeRisk Advisor</h2>
            </div>

            <div className={styles.projectCopy}>
              <p className={styles.lead}>
                Production multi-agent security review system deployed on Google
                Cloud Run with a Next.js frontend on Cloudflare Pages.
              </p>

              <p>
                The system orchestrates five specialized agents: VulnScanner,
                BehavioralRisk, Skeptic, Remediation, and Synthesizer, using a
                hub-and-spoke LangGraph architecture.
              </p>

              <p>
                It integrates OpenAI and Anthropic APIs across an OWASP Top 10
                and CVSS 3.1 analysis pipeline with real-time SSE streaming and
                adversarial false-positive review.
              </p>

              <p className={styles.tech}>
                Python · FastAPI · LangGraph · OpenAI API · Anthropic API ·
                OWASP · CVSS 3.1 · Next.js · TypeScript · Cloudflare Pages ·
                Google Cloud Run
              </p>

              <a
                href="https://coderisk.craigstueber.com"
                target="_blank"
                rel="noreferrer"
                className={styles.textLink}
              >
                Visit CodeRisk Advisor
                <span aria-hidden="true"> →</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <div className={styles.twoColumnHeader}>
            <div>
              <p className={styles.eyebrow}>Research</p>

              <h2>Evaluating the Security of AI-Generated Code</h2>
            </div>

            <div className={styles.projectCopy}>
              <p className={styles.lead}>
                A quantitative study using a custom scoring framework.
              </p>

              <p>
                My doctoral research develops a hybrid vulnerability scoring
                framework combining OWASP, CVSS, and LLM-specific behavioral
                metrics.
              </p>

              <p>
                The research examines why large language models produce insecure
                or unreliable code, how those risks can be measured
                systematically, and how structured prompting frameworks reduce
                vulnerability rates in production-deployed systems.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Education</p>
            <h2>Education</h2>
          </div>

          <div className={styles.education}>
            <article>
              <p className={styles.school}>National University</p>
              <h3>Doctor of Philosophy</h3>
              <p>
                Specialization in AI Safety, Behavioral Reliability, and
                Security in AI-Generated Code
              </p>
            </article>

            <article>
              <p className={styles.school}>Strayer University</p>
              <h3>Master of Science in Information Technology</h3>
              <p>
                Concentration in IT Management & Information Security Management
              </p>
            </article>

            <article>
              <p className={styles.school}>Strayer University</p>
              <h3>Bachelor of Science in Information Technology</h3>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.skillsSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>Technical Skills</p>
            <h2>Tools & Systems</h2>
          </div>

          <div className={styles.skillGrid}>
            {skillGroups.map((group) => (
              <article key={group.title} className={styles.skillGroup}>
                <h3>{group.title}</h3>

                <div className={styles.skillList}>
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className={styles.competencies}>
            <div>
              <p className={styles.competencyLabel}>
                Deployment & Field Delivery
              </p>

              <p>
                Customer-Facing Implementation · Requirements Translation ·
                Stakeholder Communication · Technical Scoping · 0-1 Product
                Delivery
              </p>
            </div>

            <div>
              <p className={styles.competencyLabel}>Evaluation & Safety</p>

              <p>
                Behavioral Regression Detection · Drift Analysis · Prompt A/B
                Testing · Failure Mode Analysis · AI Governance
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.closing}>
        <Container className={styles.closingInner}>
          <p className={styles.eyebrow}>Get In Touch</p>

          <h2>Interested in the work behind the books?</h2>

          <p>
            For professional inquiries, research conversations, media, or other
            questions, you can reach me through the contact page.
          </p>

          <Link href="/contact" className={styles.primaryAction}>
            Contact Me
          </Link>
        </Container>
      </section>
    </main>
  );
}
