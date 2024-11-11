'use client'

export const PromotionRule = () => {

    return (
        <>
            <div className="flex justify-center w-full">
                <div className="rounded-full w-2/3 bg-gray-500 text-white text-center py-4">Withdraw Rule</div>
            </div>
            <div className="relative border p-8 rounded-lg bg-white text-black font-semibold -top-10 z-[-1]">You must play X5 of the loaded amount to withdraw.
                {'('}Ex. 10{'>'}50, 50{'>'}250{')'}<br />
                The maximum withdrawal amount per day is $4,000, for only deposit and if it
                exceeds that amount, you can withdraw additionally the next day only for deposit players
            </div>
        </>
    )
}