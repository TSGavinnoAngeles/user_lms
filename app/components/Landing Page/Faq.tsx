import React from "react";

const Faq = () => {
  return (
    <div className="grid place-items-center bg-nyanza-800 text-3xl">
      Frequently Asked Questions{" "}
      <div className="collapse collapse-arrow bg-nyanza-800 max-w-[50%] ">
        <input type="checkbox" />
        <div className="collapse-title text-3xl font-semibold">
          What is Seneca?
        </div>
        <div className="collapse-content text-xl">
          <p>
            Seneca is a Learning Management System that will help you learn all
            your coding needs. Seneca is dedicated in helping you througout your
            journey and dedicated to teaching you the basics to help you get a
            better understanding of various topics. Currently Seneca is also
            seeking to extend beyond coding and teach other subjects as well.{" "}
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-nyanza-800 max-w-[50%] ">
        <input type="checkbox" />
        <div className="collapse-title text-3xl font-semibold">
          What can I learn from Seneca?
        </div>
        <div className="collapse-content text-xl ">
          <p>
            You can learn a whole variety of skills from Seneca. Raning from
            UI/UX design, the Software Development Life Cycle, Q.A., Full-Stack
            development, and even more.
          </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-nyanza-800 max-w-[50%] text-3xl">
        <input type="checkbox" />
        <div className="collapse-title text-3xl font-semibold">
          Can I contribute to Seneca?
        </div>
        <div className="collapse-content text-xl">
          <p>
            You definitely can! Seneca aims to grow larger by a contribution of
            profesionals and individuals that would want to contribute to
            teaching others. Reach out to our team for more information on how
            to join Senca Today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
