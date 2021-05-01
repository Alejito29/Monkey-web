describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.com/uniandes');
        cy.wait(1000);
        randomEvent(20);
    })
})


function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    function clickInLink(){
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
            }
            cy.wait(1000);
        });
    }

    function clickInButton(){
        cy.get('button').then($button => {
            var buttonLink = $button.get(getRandomInt(0, $button.length));
            if(!Cypress.dom.isHidden(buttonLink)) {
                cy.wrap(buttonLink).click({force: true});
            }
            cy.wait(1000);
        });
    }

    function inputText(){
        var item = cy.get('input').first()
        item.type('8000-1612023', {force: true});
    }

    function clickCombox(){
        cy.get("body").then(($body) => {
            // synchronously query for element
            if ($body.find("#university-list-select").length) {
                cy.get('#university-list-select').click({force: true})
            } else {
                // do something else
            }
        })

    }

    var monkeysLeft = monkeysLeft;

    if(monkeysLeft > 0) {
        var state = getRandomInt(0, 5);
        console.log('Mensaje del random'  + state);
        switch (state) {
            case 1:
            clickInLink();
              break;
            case 2:
            clickInButton();
              break;
            case 3:
            clickCombox();
              break;
            case 4:
            inputText();
            break;
    
          }
        monkeysLeft = monkeysLeft - 1;
        randomEvent(monkeysLeft);
    }
}
