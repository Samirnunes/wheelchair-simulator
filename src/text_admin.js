import { Admin } from "./admin";

export class TextAdmin extends Admin{
    #standardClass = "text";
    #standardTextId = "standard-text"

    controlText(cameraAdmin){
        if(cameraAdmin.camera.position.z < -10){
            this.hideText();
        }
    
        if(cameraAdmin.camera.position.x > -15 && cameraAdmin.camera.position.x < 0 && cameraAdmin.camera.position.z > -45){
            this.modifyText("Infelizmente, você não consegue subir essa escada. Procure uma rampa do outro lado da plataforma.");
            this.setTextBoxSize(450, 80);
            this.showText();
        }
    
        if(cameraAdmin.camera.position.x > -15 && cameraAdmin.camera.position.x < 0 && cameraAdmin.camera.position.z < -45){
            this.hideText();
        }
    
        if(cameraAdmin.camera.position.x > 45 && cameraAdmin.camera.position.x < 60 && cameraAdmin.camera.position.z < -63 && cameraAdmin.camera.position.z > -72){
            this.modifyText("Parabéns, você encontrou a rampa! Agora suba ela e vá até a sorveteria do Gus.");
            this.setTextBoxSize(450, 80);
            this.showText();
        }
    
        if(cameraAdmin.camera.position.x > 45 && cameraAdmin.camera.position.x < 60 && cameraAdmin.camera.position.z > -63 && cameraAdmin.camera.position.z < -45){
            this.hideText();
        }
    
        if(cameraAdmin.camera.position.x > 20 && cameraAdmin.camera.position.x < 32 && cameraAdmin.camera.position.z < -42 && cameraAdmin.camera.position.z > -50){
            this.modifyText("Você conseguiu! O sorvete do Gus está uma delícia! Agora, vá para o parque aproveitar esse belo dia de Sol.");
            this.setTextBoxSize(450, 80);
            this.showText();
        }
    
        if(cameraAdmin.camera.position.x > 32 && cameraAdmin.camera.position.z < -42 && cameraAdmin.camera.position.z > -50){
            this.hideText();
        }
    
        if(cameraAdmin.camera.position.x > 81 && cameraAdmin.camera.position.x < 97 && cameraAdmin.camera.position.z < -84 && cameraAdmin.camera.position.z > -92){
            this.modifyText("Poxa! A entrada é estreita demais para a sua cadeira de rodas. Vá pelo outro lado do parque.");
            this.setTextBoxSize(450, 80);
            this.showText();
        }
    
        if(cameraAdmin.camera.position.x < 81 && cameraAdmin.camera.position.z < -84 && cameraAdmin.camera.position.z > -92){
            this.hideText();
        }
    
        if(cameraAdmin.camera.position.x > -16 && cameraAdmin.camera.position.x < 0 && cameraAdmin.camera.position.z < -205 && cameraAdmin.camera.position.z > -230){
            this.modifyText("Você chegou ao parque. Aproveite!");
            this.setTextBoxSize(450, 80);
            this.showText();
        }
    }

    modifyText(newText) {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.textContent = newText;
        }
    }

    hideText() {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.style.display = "none";
        }
    }

    showText() {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.style.display = ""; 
        }
    }

    setTextBoxSize(width, height) {
        var textElement = document.getElementById(this.#standardTextId);
        if (textElement) {
            textElement.style.width = width;
            textElement.style.height = height;
        }
    }
}