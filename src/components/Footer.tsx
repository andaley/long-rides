import ThemePicker from "@/components/ThemePicker";

const Footer = () => {
  return (
    <footer>
      <ThemePicker />
      <p className="copyright">
        Made by{" "}
        <a
          href="https://adriannedaley.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Adrianne Daley
        </a>{" "}
        | view the code on{" "}
        <a
          href="https://github.com/noelledaley/long-rides/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
