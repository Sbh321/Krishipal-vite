import BlogCard from "./BlogCard";

const Blogs = () => {
  const data = [
    {
      img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/post__1.webp",
      title: "Lorem Ipsum",
      date: "01/01/2021",
      comment: 10,
    },
    {
      img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/post__2.webp",
      title: "Lorem Ipsum",
      date: "01/12/2021",
      comment: 10,
    },
    {
      img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/post__3.webp",
      title: "Lorem Ipsum",
      date: "01/22/2021",
      comment: 10,
    },
  ];

  return (
    <div className="container pt-16">
      <h2 className="font-bold text-2xl">Latest News</h2>
      <p className="text-gray-500">
        Present posts in a best way to highlight interesting moments of your
        blog.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
        {data.map((el) => (
          <BlogCard
            key={el.date}
            img={el.img}
            title={el.title}
            date={el.date}
            comment={el.comment}
          />
        ))}
      </div>
    </div>
  );
};
export default Blogs;
