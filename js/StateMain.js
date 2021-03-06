var cursor, chicken, fishFoodGroup, text;

var StateMain={    
    
   preload:function()
    {
       game.load.image("background", "images/background.png");
       game.load.image("chicken", "images/chicken.png");
       game.load.spritesheet("bluefish-h", "images/bluefish-h.png", 32, 20, 3);
    },
    
    create:function()
    {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        if (screen.width>1500)
        {
            var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
            game.world.setBounds(-20, 0, 680, 575);
        }

        var background = game.add.image(0, 0, "background");
        
        chicken = game.add.sprite(100, 100, "chicken");
        chicken.scale.setTo(.2, .2);
        chicken.anchor.setTo(0.5, 0.5);

        fishFoodGroup = game.add.group();
        fishFoodGroup.setAll('anchor.x', 0.5);
        fishFoodGroup.setAll('anchor.y', 0.5);       
        fishFoodGroup.setAll('checkWorldBounds', true);   
        fishFoodGroup.setAll('outOfBoundsKill', true);
        fishFoodGroup.enableBody = true;

        game.physics.arcade.enable([chicken, fishFoodGroup]);
        chicken.body.collideWorldBounds = true;
        chicken.body.gravity.y = 5000;
        chicken.body.bounce.y = .3;
        chicken.body.bounce.x = .3;
        chicken.body.immovable = true;

        cursor = game.input.keyboard.createCursorKeys();
        
        game.time.events.loop(Phaser.Timer.SECOND *1, this.createFish, this);

    },

    destroyFish: function(fish) {
        fish.kill();
    },

    createFish: function() {
        var xPosition = 0;
        var yPosition = game.rnd.integerInRange(100, 450);
        var fish =  fishFoodGroup.create(xPosition, yPosition, 'bluefish-h');
        fish.checkWorldBounds = true;
        fish.body.outOfBoundsKill = true;
        fish.body.enableBody = true;
        fish.animations.add('swim');
        fish.animations.play('swim', 6, true);
        fish.body.velocity.x = 20;
        fish.scale.x = -1;

    },
    
    update:function()
    {       
        this.controls();
        game.physics.arcade.collide(chicken, fishFoodGroup, this.eatFish, null, this);

    },

    eatFish(chicken, fish) {
        fish.kill();

    },

    controls: function() {
        if (cursor.up.isDown) {
            chicken.body.velocity.y = -400;
        }

        if (cursor.down.isDown) {
            chicken.body.velocity.x = 0;
            chicken.body.velocity.y = 0;
        }
       
        if (cursor.right.isDown) {
            chicken.body.velocity.x = 400; 
            chicken.scale.setTo(.2, .2);           
        }

        if (cursor.left.isDown) {
            chicken.body.velocity.x = -400;
            chicken.scale.setTo(-.2, .2);
        }
    }    
    
};