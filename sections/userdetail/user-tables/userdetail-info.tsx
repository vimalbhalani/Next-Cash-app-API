"use client";

import { AdminRegisterUsers } from "@/constants/data";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserdetailInfo() {
    const [data, setData] = useState<AdminRegisterUsers[]>([]);
    const [totalData, setTotalData] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    useEffect(() => {
        if (!id) return;  // Return early if 'id' is not available

        async function fetchData() {
            try {
                setLoading(true);

                // Send the 'id' as a query parameter in the GET request
                const response = await fetch('/api/admin/getuserInfo', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${id}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                if (result.data && result.data.length > 0) {
                    setData(result.data || []); // Use an empty array if no register is found
                    setTotalData(result.totalCount || 0);
                } else {
                    console.error('No data found in the result:', result);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner or loading message if needed
    }

    return (
        <div className="p-4 mt-5">
            <p className="text-xl font-bold mt-3 text-center">#{data[0].tag}</p>
            <div className="flex mt-10">
                <p className="w-[150px] text-md font-semibold">Name</p>
                <p className="text-start">{data[0].firstname}{" "}{data[0].lastname}</p>
            </div>
            <div className="flex mt-5">
                <p className="w-[150px] text-md font-semibold">UserName</p>
                <p className="text-start w-[170px] sm:w-[300px] lg:w-[200px] break-words">{data[0].email}</p>
            </div>
            <div className="flex mt-5">
                <p className="w-[150px] text-md font-semibold">Phone Number</p>
                <p className="text-start">{data[0].register[0].phonenumber}</p>
            </div>
            <div className="flex mt-5">
                <p className="w-[150px] text-md font-semibold">IP Address</p>
                <p className="text-start">{data[0].ip}</p>
            </div>
        </div>
    );
}


