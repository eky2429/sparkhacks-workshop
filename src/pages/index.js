import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
    const initialPizzas = [];
    const initialFitlerText = "";
    const resultFromUsedState = useState(initialPizzas);
    const pizzasFromState = resultFromUsedState[0];
    const setPizzas = resultFromUsedState[1];
    const [filterText, setFilterText] = useState(initialFitlerText);

    //Use effect fetches data from pizzas.js
    useEffect(() => {
        fetch("/api/pizzas")
            //Converts each individual data to json
            .then((data) => {
                return data.json();
            })
            //Gets pizzas hash from pizzas.js
            .then((response) => {
                setPizzas(response.pizzas);
            });
    }, [pizzasFromState, setPizzas]);

    function Pizzas() {
        const filteredPizzas = pizzasFromState.filter(() => {
            return pizza.name.toLowerCase().includes(filterText);
        });

        return (
            //Takes each –pizza from pizzasFromState and ...
            filteredPizzas.map((pizza, index) => {
                return <div key={index}> {pizza.name}</div>;
            })
        );
    }

    return (
        <>
            <Head>
                <title>Web App Workshop</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <input
                    type="search"
                    name="search"
                    data-test-id="search"
                    onChange={(event) => {
                        setFilterText(event.target.value);
                    }}
                ></input>
                <Pizzas />
            </main>
        </>
    );
}
