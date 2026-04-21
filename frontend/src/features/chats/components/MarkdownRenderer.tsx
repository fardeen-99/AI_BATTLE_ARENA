import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy} from 'lucide-react';

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4 rounded-xl overflow-hidden border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-[#F8F8F8] dark:bg-[#1A1A1A] border-b border-[#E5E5E5] dark:border-[#2A2A2A]">
        <span className="text-xs font-medium text-[#666] dark:text-[#999] uppercase tracking-wider">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[#666] dark:text-[#999] hover:text-[#111] dark:hover:text-white transition-colors text-xs font-medium focus:outline-none"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || "javascript"}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          background: "transparent",
        }}
        codeTagProps={{
          style: { fontFamily: "var(--font-mono, 'Geist Mono', monospace)" },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

const markdownComponents: any = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    const value = String(children).replace(/\n$/, "");
    return !inline && match ? (
      <CodeBlock language={match[1]} value={value} {...props} />
    ) : (
      <code
        className={`${className} bg-[#F3F3F3] dark:bg-[#2A2A2A] px-1.5 py-0.5 rounded text-[#E01E5A] dark:text-[#FF79C6] font-mono text-[0.9em]`}
        {...props}
      >
        {children}
      </code>
    );
  },
  p: ({ children }: any) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
  h1: ({ children }: any) => <h1 className="text-2xl font-bold mb-4 mt-6 text-black dark:text-white uppercase tracking-tighter">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-xl font-bold mb-3 mt-5 text-black dark:text-white uppercase tracking-tight">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-lg font-bold mb-2 mt-4 text-black dark:text-white uppercase">{children}</h3>,
  ul: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
  li: ({ children }: any) => <li className="pl-1 text-sm">{children}</li>,
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-amber-500/50 pl-4 italic my-4 text-[#555] dark:text-zinc-400 bg-white/5 py-2">
      {children}
    </blockquote>
  ),
  a: ({ children, href }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-500 hover:underline"
    >
      {children}
    </a>
  ),
};

/**
 * If the AI accidentally leaks raw Tavily JSON, extract only the `answer` field
 * (and any trailing conversational text after the JSON block).
 * Otherwise, return the content as-is.
 */
function extractCleanText(content: string) {
  if (!content || typeof content !== "string") return content || "";

  // Detect Tavily JSON by characteristic keys
  if (content.includes('"query":') && content.includes('"results":')) {
    try {
      const trimmed = content.trim();
      const startIdx = trimmed.indexOf("{");
      let braceCount = 0;
      let endIdx = -1;

      for (let i = startIdx; i < trimmed.length; i++) {
        if (trimmed[i] === "{") braceCount++;
        else if (trimmed[i] === "}") {
          braceCount--;
          if (braceCount === 0) { endIdx = i; break; }
        }
      }

      if (endIdx !== -1) {
        const json = JSON.parse(trimmed.substring(startIdx, endIdx + 1));
        const trailing = trimmed.substring(endIdx + 1).trim();
        const parts = [];
        if (json.answer) parts.push(json.answer);
        if (trailing) parts.push(trailing);
        return parts.length > 0 ? parts.join("\n\n") : "I found some information. Please ask me again for a cleaner answer.";
      }
    } catch (_) {
      // malformed JSON — just show it as text
    }
  }

  return content;
}

export const MarkdownRenderer = ({ content }: { content: string }) => {
  const cleanContent = extractCleanText(content);
  return (
    <div className="markdown-content text-[#111] dark:text-[#EAEAEA] text-sm leading-relaxed transition-colors duration-500">
      <ReactMarkdown components={markdownComponents}>{cleanContent}</ReactMarkdown>
    </div>
  );
};
