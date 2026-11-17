import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helper?: string;
}

export function TextField({ label, helper, className = "", ...props }: InputProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-800">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition hover:border-slate-400 ${className}`}
      />
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helper?: string;
}

export function TextAreaField({
  label,
  helper,
  className = "",
  ...props
}: TextAreaProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-800">
        {label}
      </label>
      <textarea
        {...props}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition hover:border-slate-400 ${className}`}
      />
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  helper?: string;
  children: React.ReactNode;
}

export function SelectField({
  label,
  helper,
  children,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-slate-800">
        {label}
      </label>
      <select
        {...props}
        className={`w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 transition hover:border-slate-400 ${className}`}
      >
        {children}
      </select>
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}

interface CheckboxProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({
  label,
  description,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition hover:bg-slate-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
      />
      <div>
        <span className="block text-sm font-bold text-slate-900">{label}</span>
        {description && (
          <span className="mt-0.5 block text-xs text-slate-600">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}
