import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "@/contexts/ThemeContext";

interface CodeBlockProps {
  code: string;
  language: string;
}

// https://github.com/FormidableLabs/prism-react-renderer
export default function CodeBlock({ code, language }: CodeBlockProps) {
  const { isDark } = useTheme();
  const theme = isDark ? themes.nightOwl : themes.github;
  const bgColor = isDark ? "#011627" : "#f6f8fa";

  return (
    <Highlight theme={theme} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} rounded-md p-4 font-mono text-sm overflow-x-auto`}
          style={{ ...style, backgroundColor: bgColor }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
