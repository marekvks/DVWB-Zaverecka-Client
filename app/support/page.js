import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Support() {
  return (
    <main>
      <Navbar />
      <section className="flex flex-col items-center w-full">
        <section className="flex flex-col w-7/12 mt-8 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Support</h1>
            <p className="text-greyText text-lg mt-4">Welcome to the BlogPost Support Page! We&apos;re here to ensure that your experience with BlogPost is smooth and enjoyable. If you encounter any issues or have any questions, you&apos;re in the right place. Below, you&apos;ll find information on how to get help and support for using our platform.</p>
          </div>
          <h2 className="text-2xl mt-8"><strong>Frequently Asked Questions (FAQ)</strong></h2>
          <article className="flex flex-col gap-1">
            <h3><strong>How do I create a new blog post?</strong></h3>
            <p>To create a new blog post, log in to your account and click on the &quot;Create Post&quot; button. Use Markdown to format your content, add images, links, and more. Once you&apos;re satisfied with your post, click &quot;Save&quot; to share it with your followers.</p>
          </article>
          <article className="flex flex-col gap-1">
            <h3><strong>What is Markdown and how do I use it?</strong></h3>
            <p>Markdown is a simple text formatting language that allows you to style your blog posts with headings, lists, images, links, and more. For a comprehensive guide on how to use Markdown, check out our <Link href="https://www.markdownguide.org/" className="normal-link underline">Markdown Guide</Link>.</p>
          </article>
          <article className="flex flex-col gap-1">
            <h3><strong>How do I leave a comment on posts?</strong></h3>
            <p>To leave a comment, scroll to the bottom of the post and type your comment in the provided box, then click &quot;Post Comment.&quot;</p>
          </article>
          <article className="flex flex-col gap-1">
            <h3><strong>What should I do if I forget my password?</strong></h3>
            <p>If you forget your password, click on the &quot;Forgot Password&quot; link on the login page. Enter your email address, and we&apos;ll send you instructions to reset your password.</p>
          </article>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Need More Help?</h2>
            <article className="flex flex-col gap-1 mt-4">
              <h3><strong>Contact Us</strong></h3>
              <p>If you can&apos;t find the answer to your question in the FAQ, our support team is here to help. You can contact us via:</p>
              <ul>
                  <li><strong>Email:</strong> <Link href="mailto:support@blogpost.com" className="normal-link underline">support@blogpost.com</Link></li>
              </ul>
            </article>
            <article className="flex flex-col gap-1">
              <h3><strong>Tutorials and Guides</strong></h3>
              <p>Check out <Link href="https://www.markdownguide.org/" className="normal-link underline">markdown tutorial</Link> for step-by-step instructions on various features of markdown.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}