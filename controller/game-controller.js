class GameController extends Phaser.Scene {
    constructor() {
        super("gamecontroller");
    }
  
    preload() {
        // load image
        this.load.spritesheet(
            "playerSprite",
            "assets/player1.png",
            { frameWidth: 400, frameHeight: 400 }
        );
  
        this.load.image("background", "assets/background2.png");
        this.load.image("obstacle", "assets/abstacle1.png")
        this.load.image("finish", "assets/title.png")
    }
  
  create() {
    // Thêm hình nền
    this.add.sprite(0, 0, "background").setOrigin(0);
  
    // Thêm người chơi
    this.player = this.physics.add.sprite(500, 500, "playerSprite");
  
    this.player.setScale(0.3,0.3);
  
    // Tạo animation cho nhân vật
    this.anims.create({
    key: "anim_coins",
    frames: this.anims.generateFrameNumbers("playerSprite", { start: 0, end: 7  }),
    frameRate: 15,
    repeat: -1,
    });
           


    

    // Phát animation cho nhân vật
    this.player.play("anim_coins", true);
    this.physics.add.existing(this.player);
   
    
    console.log(this.player);
    

//test


    // Thêm chướng ngại vật
    this.obstacles = this.physics.add.group({
    key: "obstacle",
    repeat: 10, // Số lượng chướng ngại vật
    setXY: { x: 800, y: 500, stepX: 200 }, // Vị trí và khoảng cách ban đầu
    });
    this.obstacles.setVelocity(-100, 0);
  
    // Bật vật lý cho người chơi và chướng ngại vật
    this.physics.add.group(this.obstacles);

    // Cài đặt va chạm
    this.physics.add.collider(this.player, this.obstacles, this.handleCollision, null, this);

    // Cài đặt điều khiển
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown-SPACE", this.jumpPlayer, this);
  }
  
  update() {
     //Xử lý sự kiện đầu vào để di chuyển nhân vật
        // if (this.cursors.left.isDown) {
        //     this.player.x -= 5;
        // } else if (this.cursors.right.isDown) {
        //     this.player.x += 5;
        // }
  
        // if (this.cursors.up.isDown) {
        //     this.player.y -= 5;
        // } else if (this.cursors.down.isDown) {
        //     this.player.y += 5;
        // }

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-100);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(100);
        }
    
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-100);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(100);
        }
  }
  
  jumpPlayer() {
  // Xử lý sự kiện khi nhảy
  this.tweens.add({
      targets: this.player,
      y: this.player.y - 200, // Điều chỉnh độ cao nhảy tùy ý
      duration: 300,
      ease: "Linear",
      yoyo: true,
  });

  handleCollision(player, obstacle) 
  {
    // Xử lý khi người chơi va chạm với chướng ngại vật
    console.log("Game over!");
    // Bạn có thể thêm các hành động khác như hiển thị điểm, kết thúc trò chơi, vv. ở đây.
 }
}


  
  }