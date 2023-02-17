import { useEffect, useState } from 'react'
import { RequisitionAxios } from '../service/connection'
import { Link } from 'react-router-dom'
import "../style/Home.css"
function Home() {
    const [movies, setMovies] = useState(undefined)
    const [selectedOption, setSelectedOption] = useState("filmes");

    useEffect(() => {
        async function RequistionData() {
            try {
                const connection = await RequisitionAxios.Get(`/${selectedOption}`)
                if (connection) {
                    setMovies(connection.data)
                }

            } catch (error) {
                console.log(error)
            }

        }
        RequistionData()
    }, [selectedOption])
    console.log(movies)

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <main className='bg-dark'>
            <div className='radioMain' style={{ color: "#FFFFFF", textAlign: "center" }}>
                <label>
                    <strong>Filmes</strong>
                    <br />
                    <input
                        type="radio"
                        name="genre"
                        value="filmes"
                        checked={selectedOption === "filmes"}
                        onChange={handleOptionChange}
                    />
                </label>

                <label>
                    <strong>Combos</strong>
                    <br />
                    <input
                        type="radio"
                        name="genre"
                        value="combos"
                        checked={selectedOption === "combos"}
                        onChange={handleOptionChange}
                    />
                </label>
            </div>
            <h2 className='text-center'>{selectedOption}</h2>

            <section className='list_div'>

                {movies ? (
                    <section className='bg-grey centroHome'>
                        {movies.map((info) => (
                            <div className="colunasHome border m-3 bg-white px-2 mx-5 py-5 info__ justify-content-between rounded " key={info.id}>
                                <div>
                                    <img src={info.banner} alt="cartaz" className='fotosHome' />
                                </div>
                                <div className='textoCentroHome'>
                                    <p className="m-2"><h2>{info.nome}</h2></p>
                                    <p className="m-2">{info.descricao} </p>
                                    <Link to={`${selectedOption}/${info.id}`}> <button className="btn list__button px-3 me-2 my-2"><h3>Descrição</h3></button></Link>
                                </div>
                            </div>
                        ))}
                    </section>) : (<div><p>Carregando</p></div>)}
            </section>
        </main>
    )
}

export default Home