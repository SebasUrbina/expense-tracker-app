import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...props }: Props) {
    return (
        <input
            {...props}
            className="w-full p-4 pl-10 border-2 rounded-lg text-2xl font-small text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}

export default Input;
