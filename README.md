# cmc-30-projeto
O código foi construído no editor de código-fonte Visual Studio Code (VSCode). Nesse contexto, para realizar o build do código, utiliza-se, no terminal do VSCode, o comando npm run build, que é auxiliado pela biblioteca bundle.js. Em resumo, um bundler é uma ferramenta de desenvolvimento que combina muitos arquivos de código JavaScript em um único arquivo pronto para produção e carregável no navegador. A biblioteca bundle.js é a responsável por fazer esse processo, agrupando as dependências (na forma de módulos) na ordem correta. Já para rodar o código em um servidor local, clica-se com o botão direito no arquivo .html e seleciona-se Open with Live Server, cuja existência depende da instalação da extensão Live Server do VSCode.

A seguir, listam-se os nomes dos arquivos nos quais o código do projeto foi dividido e suas respectivas explicações:

- index.html: Arquivo .html do projeto, necessário para rodar o código no navegador. Nele, são definidos atributos como o título da página no navegador, o texto inicial apresentado na tela e o bundler utilizado;
- index.js: Arquivo .js principal. É o equivalente do arquivo main da linguagem C. No projeto, ele é o responsável por instanciar todos os objetos, adicioná-los à cena e realizar o loop de animação;
- admin.js: Define a classe Admin, que serve de interface para a criação das outras classes, cada qual administra uma característica do projeto;
camera admin.js: Define a classe CameraAdmin, que administra todas as propriedades da câmera, incluindo a mesh do cadeirante, que está acoplada à câmera, sua movimentação e body para colisão;
- city_admin.js: Define a classe CityAdmin, que administra todas as propriedades da cidade renderizada na cena, incluindo cada um de seus objetos, meshes e bodies para colisão;
- light_admin.js: Define a classe LightAdmin, que administra a iluminação da cena;
- text_admin.js: Define a classe TextAdmin, que possui métodos para administrar o texto mostrado na tela durante a animação;
- world_builder.js: Define a classe WorldBuilder, que configura os objetos canvas, scene, sizes, world e renderer, os quais são necessários para a simulação funcionar. Também foi utilizada para definir o objeto cannonDebugger durante a fase de testes do projeto, para a visualização das bounding boxes;
-test_utils.js: Define métodos que foram úteis durante a fase de testes do simulador.
