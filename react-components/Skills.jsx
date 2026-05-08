import React, { useRef } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaJava,
  FaPython,
  FaReact,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import { SiMongodb, SiMysql } from "react-icons/si";
import "./Skills.css";

const SKILLS = [
  { name: "HTML5",        Icon: FaHtml5,     color: "#e34f26" },
  { name: "CSS3",         Icon: FaCss3Alt,   color: "#1572b6" },
  { name: "JavaScript",   Icon: FaJsSquare,  color: "#f7df1e" },
  { name: "Java",         Icon: FaJava,      color: "#007396" },
  { name: "Python",       Icon: FaPython,    color: "#3776ab" },
  { name: "MySQL",        Icon: SiMysql,     color: "#4479a1", fallback: FaDatabase },
  { name: "MongoDB",      Icon: SiMongodb,   color: "#47a248", fallback: FaDatabase },
  { name: "React",        Icon: FaReact,     color: "#61dafb" },
  { name: "Git & GitHub", Icon: FaGitAlt,    color: "#f05032" },
];

export default function Skills({
  speed = 35,
  title = "My Skills",
  subtitle = "A snapshot of the technologies I work with.",
}) {
  const marqueeRef = useRef(null);

  const pause = () => marqueeRef.current?.classList.add("is-paused");
  const resume = () => marqueeRef.current?.classList.remove("is-paused");

  const items = [...SKILLS, ...SKILLS];

  return (
    <section className="skills-section" id="skills">
      <div className="skills-inner">
        <h2 className="skills-title">{title}</h2>
        {subtitle && <p className="skills-subtitle">{subtitle}</p>}

        <div
          ref={marqueeRef}
          className="skills-marquee"
          style={{ "--marquee-duration": `${speed}s` }}
          onTouchStart={pause}
          onTouchEnd={resume}
          onTouchCancel={resume}
        >
          <div className="skills-track">
            {items.map((skill, i) => {
              const Icon = skill.Icon || skill.fallback;
              const isClone = i >= SKILLS.length;
              return (
                <div
                  key={i}
                  className="skill-card"
                  aria-hidden={isClone || undefined}
                >
                  <Icon
                    className="skill-card__icon"
                    style={{ color: skill.color }}
                  />
                  <span className="skill-card__name">{skill.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
