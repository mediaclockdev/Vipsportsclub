import React from "react";

const About = () => {
  return (
    <div className="bg-[#212E36B2]">
      <div className="max-w-screen-2xl mx-auto px-8 py-5 ">
        <div className="flex flex-col justify-center items-center space-y-5">
          <h2 className="text-4xl">About Us</h2>

          <div className="space-y-5">
            <p className="max-w-[647px] text-center text-xl">
              We’re proudly Australian and passionate about rewarding everyday
              Aussies. At [Your Brand Name], we’ve built a members-only
              community that combines real value and real excitement. Our goal
              is simple — to help you save more, live better, and win big.
            </p>
            <p className="max-w-[647px] text-center text-xl">
              Every membership supports local businesses through exclusive
              offers and gives you automatic entry into our major monthly
              giveaways. From utes and 4WDs to holidays and cash — our members
              get chances to win prizes that make life extraordinary.
            </p>
          </div>
          <button className="darkbutton">Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default About;
