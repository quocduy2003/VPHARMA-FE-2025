"use client";
import clsx from "clsx";

type Props = {
  readonly label?: string;
  readonly helpText?: string;
  readonly error?: string;
  readonly iconRight?: React.ReactNode;
  readonly disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  helpText,
  error,
  iconRight,
  disabled,
  ...rest
}: Props) {
  return (
    <label className="block">
      {label && <span className="sub2 mb-1 block">{label}</span>}
      <div
        className={clsx(
          "relative",
          disabled && "opacity-70"
        )}
      >
        <input
          {...rest}
          disabled={disabled}
          className={clsx(
            "input-base",
            "focus:input-focus",
            error && "input-error",
            disabled && "input-disabled",
            iconRight && "pr-12"
          )}
        />
        {iconRight && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--color-primary)]">
            {iconRight}
          </span>
        )}
      </div>
      {error ? (
        <span className="extra-xs mt-1 text-[color:var(--color-danger)]">{error}</span>
      ) : (
        helpText && <span className="extra-xs mt-1 opacity-70">{helpText}</span>
      )}
    </label>
  );
}
