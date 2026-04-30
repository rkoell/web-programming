import portrait from '../assets/imageofself2.jpeg';

function Home() {
    return (
        <>
            <img src={portrait} />
            <h1>About Me</h1>
            <p>My name is Nathan Varnell. I am an undergraduate information technology student at Arkansas Tech University. The focus of my degree is programming, database, and web.</p>
            <p>You can learn more about my projects and education on this site.</p>
        </>
    );
}

export default Home;