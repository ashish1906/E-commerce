import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repudiandae vero quae, facilis unde laboriosam amet libero cumque
            ipsum qui voluptatibus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            dignissimos necessitatibus sed vel modi perferendis.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
           our mission is to consectetur adipisicing elit. Ut magnam
            quisquam, quod voluptates necessitatibus tempore modi? Aperiam.
          </p>
        </div>
        </div>

        <div className="text-xl py-4">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>

        <div className="flex flex-col md:flex-row twxt-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurence:</b>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              commodi voluptate voluptatibus nam mollitia soluta ullam suscipit
              repellendus eos?
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className="text-gray-600">
              With our user-friendly interface and hassle-free ordering
              process,shopping
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              our team of dedicated professionals is here to assure you to
              provide you best customer service
            </p>
          </div>
        </div>
        <NewsletterBox />
      </div>

  );
};

export default About;
