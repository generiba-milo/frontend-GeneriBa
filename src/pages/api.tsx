export const handleSubmit = async (url, job) => {

    try {
        const res = await fetch("https://api.generiba.ai/" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ""
            },
            body: JSON.stringify(job),
        });

        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            return "error";
        }
    } catch (err) {
        return "error";
    }
};