import Link from 'next/link';
import clientPromise from "../lib/mongodb";
import React, { useState } from "react";
let assignList = [];
let tingtingværdi = 0;
let AssSetArr = [];
let loadedOnce = false;
let opgPerc = 0.00;
let opgPercArr = [];
let opgFeedback = [];


export default function Opgaver({ assignments, assSets }) {


    const [toggle, setToggle] = useState(false);

    function CheckAnswer(bId) {
        console.log(assSets);
        console.log(assignments);
        console.log(assignments.find(a => a._id == bId).correctAnswer);
        const ansInput = document.getElementById(bId).value;
        const asAns = assignments.find(a => a._id == bId).correctAnswer;
        console.log(asAns);
        console.log(ansInput);
        if (ansInput == asAns) {
            alert("Rigtigt svar!");
            opgaveReview(true, bId);
        } else {
            alert("Forkert svar!");
            opgaveReview(false, bId);
        }
    }

    function MakeClasses() {
        let classes = [];
        for (let i = 0; i < assSets.length; i++) {
            if (classes.includes(assSets[i].assClass) == false)
                classes.push(assSets[i].assClass);
        }
        console.log(classes);
        return classes;
    }
    function MakeAssSetThroughClass() {

        if (typeof window === "undefined") {

            assSets.map((assSet) => (
                AssSetArr.push(assSet)
            ))
        } else {

            AssSetArr = [];
            const classInput = document.getElementById("class").value;
            for (let i = 0; i < assSets.length; i++) {
                if (assSets[i].assClass == classInput)
                    AssSetArr.push(assSets[i]);
            }
        }

    return AssSetArr;
}

    async function GetAssignments() {
        assignList = [];

        const assSet_id = assSets.find(a => a.name == document.getElementById("assName").value)._id;
        console.log(assSet_id);
        for (let i = 0; i < assignments.length; i++) {

            if (assSet_id == assignments[i].assSetID) {

                assignList.push(assignments[i]);
            }
        }
        console.log(assignList)
        console.log(toggle);
        setToggle(prevState => !prevState)
        tingtingværdi = 1;
        opgPerc = 0.00;
        opgPercArr = [];
        opgFeedback = [];
    }

    function opgaveReview(bool, butID) {
        if (opgPercArr.includes(butID) == false) {
            opgPercArr.push(butID);
            if (bool == true) {
                opgPerc++;
                opgFeedback.push(1);
                console.log(opgPerc);
                console.log(opgPercArr);
            } else if (bool == false) {
                opgFeedback.push(0);
                console.log(opgPerc);
                console.log(opgPercArr);
            }
        }
    }

    async function endOfSet() {
        console.log(opgPercArr);
        console.log(opgPerc);
        const perc = (opgPerc / opgPercArr.length) * 100;
        const stringPerc = perc.toString().substring(0, 5);
        console.log(stringPerc);
        alert("Du fik " + stringPerc + "% rigtige svar!");
        const res = await fetch("/api/addFeedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listOfCorr: opgFeedback.toString(),
                assSetID: assSets.find(a => a.name == document.getElementById("assName").value)._id,
            }),
        });
        const data = await res.json();
        console.log(data);
    }





    return (

        <div id="primary">

            <h1>Besvar Opgavar</h1>

            <label for="class">Vælg en Klasse: </label>
            <select name="class" id="class">
                {MakeClasses().map((className) => (
                    <option value={className}>{className}</option>
                ))}
            </select>
            <br></br>
            <label for="assName">Vælg et Opgavesæt: </label>
            <select name="assName" id="assName">
                {MakeAssSetThroughClass().map((assSet) => (
                    <option value={assSet.name}>{assSet.name}</option>
                ))}
            </select>

            <div >


                <div>
                    <br />
                    <br />
                    <br />
                    <br />

                    <button onClick={GetAssignments}>Få Opgavesæt</button>
                    {toggle ? (
                        assignList.map((assignment) => (
                            <>
                                <div id="ass">
                                    <h2>{assignment.assignmentText}</h2>
                                    <form>
                                        <label>
                                            Dit Svar:
                                            <input type="text" name="answer" id={assignment._id} />
                                        </label>
                                    </form>
                                    <div id="test1">
                                        <button onClick={() => CheckAnswer(assignment._id)} class="chkBtn" > Check Svar</button>
                                    </div>
                                </div>
                            </>

                        ))

                    ) : null}
                </div>

                <button onClick={endOfSet}>Færdiggør Opgave Sæt</button>


            </div>

            <style jsx>{`
            #ass {
                display: flex;
                flex-direction: column;
                }
            #ass > div {
                margin-bottom: 100px;
                margin-left: 10px;
            }
            #test1 {
                margin-left: 0% !important;
                padding-left: 0% !important;

            }
            `
            }
            </style>
        </div>

    );
}


export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("test");

        const assSets = await db
            .collection("asssets")
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        const assignments = await db
            .collection("singles")
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        return {
            props: { assignments: JSON.parse(JSON.stringify(assignments)), assSets: JSON.parse(JSON.stringify(assSets)) },
        };

    }
    catch (e) {
        console.error(e);
    }
}
/*
                {assSets.map((assSet) => (
                    <>
                        <div>
                            <h2>{assSet.assClass}</h2>
                            <h3>{assSet.name}</h3>
                        </div>
                    </>
                ))}
*/


/*


*/