'use client';

import React, { JSX } from 'react';
import type {
  RichTextBlock,
  RichTextChild,
  RichTextNode,
  RichTextLink,
  RichTextListItem,
} from '@/types';

const renderSingleChild = (child: RichTextChild, key: React.Key): React.ReactNode => {
  if (child.type === 'text') {
    const node = child as RichTextNode;
    let content: React.ReactNode = node.text;

    if (node.bold) content = <strong>{content}</strong>;
    if (node.italic) content = <em>{content}</em>;
    if (node.underline) content = <u>{content}</u>;
    if (node.strikethrough) content = <s>{content}</s>;
    if (node.code)
      content = <code className="bg-gray-100 text-red-600 px-1 rounded">{content}</code>;

    return <React.Fragment key={key}>{content}</React.Fragment>;
  }

  if (child.type === 'link') {
    const link = child as RichTextLink;
    return (
      <a
        key={key}
        href={link.url}
        target={link.newTab ? '_blank' : '_self'}
        rel={link.newTab ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:underline"
      >
        {renderChildren(link.children)}
      </a>
    );
  }

  return null;
};

const renderChildren = (children: RichTextChild[]): React.ReactNode =>
  children.map((child, index) => renderSingleChild(child, index));

interface RichTextRendererProps {
  content: RichTextBlock[];
  className?: string; // chỉ 1 prop duy nhất để css ngoài
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content || content.length === 0) return null;

  const renderHeading = (block: RichTextBlock, index: number): React.ReactElement => {
    const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
    return (
      <Tag key={index} className={`font-bold my-4 scroll-mt-20 ${className}`}>
        {renderChildren(block.children)}
      </Tag>
    );
  };

  const renderParagraph = (block: RichTextBlock, index: number): React.ReactElement => (
    <p key={index} className={`mb-4 leading-relaxed ${className}`}>
      {renderChildren(block.children)}
    </p>
  );

  const renderList = (block: RichTextBlock, index: number): React.ReactElement => {
    const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
    const listClassName =
      block.format === 'ordered' ? 'list-decimal list-inside' : 'list-disc list-inside';

    return (
      <ListTag key={index} className={`${listClassName} mb-4 pl-5 ${className}`}>
        {block.children.map((listItem, i) => (
          <li key={i}>{renderChildren((listItem as RichTextListItem).children)}</li>
        ))}
      </ListTag>
    );
  };

  const renderQuote = (block: RichTextBlock, index: number): React.ReactElement => (
    <blockquote
      key={index}
      className={`border-l-4 border-gray-300 pl-4 italic my-4 ${className}`}
    >
      {renderChildren(block.children)}
    </blockquote>
  );

  const renderCode = (block: RichTextBlock, index: number): React.ReactElement => (
    <pre
      key={index}
      className="bg-gray-900  text-sm p-4 rounded-md overflow-x-auto my-4"
    >
      <code>{block.children.map((c) => (c as RichTextNode).text).join('')}</code>
    </pre>
  );

  return (
    <div className={`max-w-none ${className}`}>
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return renderHeading(block, index);

          case 'paragraph':
            return renderParagraph(block, index);

          case 'list':
            return renderList(block, index);

          case 'quote':
            return renderQuote(block, index);

          case 'code':
            return renderCode(block, index);

          default:
            return (
              <p key={index} className="text-red-500">
                ⚠️ Unknown block type: {block.type}
              </p>
            );
        }
      })}

    </div>
  );
};
