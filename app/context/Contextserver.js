import connectToMongoDB from "@/Database/MongoDB";
// import ContextFunction from "./Context";
// import Component from "./component";
import ContextFunction from "./Productcontext";
import Contextvalue from "./Contextvalue";
// import Contextvalue from './Contextvalue';y

const Contextserver = async () => {
    const res = await fetch(`http://localhost:3000/api/getProducts`, {
        cache: 'no-store'
    })
    return res.json();   
}






export default Contextserver
