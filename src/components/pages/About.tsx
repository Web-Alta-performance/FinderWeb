import React from "react";

// nome: função
const team = [
    {
        name: 'Marcio Sobel',
        function: 'Desenvolvedor e designer do aplicativo, API, e este website.'
    },
    {
        name: 'nome',
        function: 'função',
    },
]

const About = () => {
    return (<div>
            <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
                <h3 style={{textAlign: 'center'}}>Esta página ainda receberá uma estilização em CSS apropriada.</h3>
            </div>
            <h2>Sobre o PetFinder</h2>
            <p>
                PetFinder é um app que visa facilitar e democratizar
                a adoção de pets em busca de novos donos.
            </p>
            <br/>
            <h2>Sobre este website</h2>
            <p>
                O site é uma representação visual do banco de dados do
                aplicativo PetFinder. Ele deve lhe proporcionar todas as
                opções de CRUD para cada documento disponível.
            </p>
            <br/>
            <h2>Equipe</h2>
            {team.map((member, key) => {
                return (
                    <p key={key}>{`${member.name} — ${member.function}`}</p>
                )
            })}
            <br/>
            <h2>Repositório do Github</h2>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder-website">
                Repositório deste site ↗
            </a>
            <br/><br/>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder">
                Repositório do aplicativo ↗
            </a>
            <br/><br/>
            <a style={{textDecoration: 'underline'}} href="https://github.com/Web-Alta-performance/PetFinder-api">
                Repositório da API ↗
            </a>
            <br/><br/>
        </div>
    )
};

export { About };