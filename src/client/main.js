import Container from './components/container';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      (
          <Container>
              <h1>Список афоризмов</h1>
          </Container>
      ),
      document.getElementById('root')
  );
}, false);

