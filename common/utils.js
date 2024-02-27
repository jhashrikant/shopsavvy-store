
const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry"
];

const localStorage = () => {
    const get = (key) => {
        return localStorage.getItem(key)
    }

    const set = (key, value) => {
        if (!key || !value) return;
        localStorage.setItem(key, value)
    }

    const remove = (key) => {
        localStorage.removeItem(key)
    }

    const clear = () => {
        localStorage.clear()
    }

    return {
        get,
        set,
        remove,
        clear
    }
}

export {
    indianStates,
    localStorage
}



// You can use this array to dynamically generate your dropdown options in JavaScript.

