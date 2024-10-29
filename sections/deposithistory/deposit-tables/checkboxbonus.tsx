"use client";
import React from "react";

export const CheckboxBonus = (checkedStatus : any) => {

    const isChecked = checkedStatus.checkedStatus;

    return (
        <div>
            <input
                type="checkbox"
                checked={isChecked}
                className="w-4 h-4 rounded"
            />
        </div>
    );
};
