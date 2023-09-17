import { useState, useEffect } from "react";

const API_URL = 'https://date.nager.at/api/v3/NextPublicHolidaysWorldwide'
const useGetWorldWideHolidays = () => {
    const [data, setData] = useState<Record<string, Array<string>>>({});

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data: Array<WorldWideHoliday>) => {
                const result:Record<string, Array<string>> = {};
                if(data && data.length>0){
                    data.forEach((item) => {
                        if(result[item.date]){
                            result[item.date].push(item.name);
                        }else{
                            result[item.date] = [item.name]
                        }
                    })
                }
                setData(result)
                console.log(result)
            })
            .catch((e) => {console.error(e)});
    }, []);


    return [data];
};

export default useGetWorldWideHolidays;