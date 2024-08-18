(self.webpackChunklegion_solver = self.webpackChunklegion_solver || []).push([[179], {
    372: (e,t,i)=>{
        "use strict";
        var n = i(379)
          , r = i.n(n)
          , o = i(28);
        r()(o.Z, {
            insert: "head",
            singleton: !1
        }),
        o.Z.locals;
        class s {
            constructor(e, t) {
                this.x = e,
                this.y = t
            }
        }
        var l, a, d = i(486);
        class h {
            constructor(e, t, i) {
                this.shape = e,
                this.amount = t,
                this.id = i
            }
            static createPiece(e, t) {
                return new h(e,t,this.curId++)
            }
            get cellCount() {
                Object.defineProperty(this, "cellCount", {
                    value: 0,
                    writable: !0
                });
                for (let e = 0; e < this.shape.length; ++e)
                    for (let t = 0; t < this.shape[e].length; ++t)
                        this.shape[e][t] > 0 && this.cellCount++;
                return this.cellCount
            }
            get pointShape() {
                Object.defineProperty(this, "pointShape", {
                    value: []
                });
                for (let e = 0; e < this.shape.length; ++e)
                    for (let t = 0; t < this.shape[e].length; ++t)
                        1 == this.shape[e][t] ? this.pointShape.push(new c(t,e,!1)) : 2 == this.shape[e][t] && this.pointShape.push(new c(t,e,!0));
                return this.pointShape
            }
            get offCenter() {
                Object.defineProperty(this, "offCenter", {
                    value: 0,
                    writable: !0
                });
                for (let e = 0; e < this.shape[0].length; e++)
                    if (0 != this.shape[0][e]) {
                        this.offCenter = e;
                        break
                    }
                return this.offCenter
            }
            get transformations() {
                Object.defineProperty(this, "transformations", {
                    value: [],
                    writable: !0
                });
                let e, t = [...this.shape];
                for (let i = 0; i < 2; i++) {
                    for (let i = 0; i < 4; i++) {
                        e = new Array(t[0].length).fill(0).map((()=>new Array(t.length).fill(0)));
                        for (let i = 0; i < t.length; i++)
                            for (let n = 0; n < t[0].length; n++)
                                0 != t[i][n] && (e[t[0].length - n - 1][i] = t[i][n]);
                        t = e,
                        this.transformations.push(new h(t,this.amount,this.id))
                    }
                    e = new Array(t.length).fill(0).map((()=>new Array(t[0].length).fill(0)));
                    for (let i = 0; i < t.length; i++)
                        for (let n = 0; n < t[0].length; n++)
                            0 != t[i][n] && (e[t.length - i - 1][n] = t[i][n]);
                    t = e
                }
                return this.transformations = d.unionWith(this.transformations, d.isEqual),
                this.transformations
            }
            get pointTransformations() {
                Object.defineProperty(this, "pointTransformations", {
                    value: []
                });
                for (let e of this.transformations)
                    this.pointTransformations.push(e.pointShape);
                return this.pointTransformations
            }
            get restrictedTransformations() {
                Object.defineProperty(this, "restrictedTransformations", {
                    value: []
                });
                for (let e of this.transformations)
                    e.shape[0][1 + e.offCenter] && 0 != e.shape[0][1 + e.offCenter] || this.restrictedTransformations.push(e);
                return this.restrictedTransformations
            }
            get restrictedPointTransformations() {
                Object.defineProperty(this, "restrictedPointTransformations", {
                    value: []
                });
                for (let e of this.restrictedTransformations)
                    this.restrictedPointTransformations.push(e.pointShape);
                return this.restrictedPointTransformations
            }
        }
        (a = "curId")in (l = h) ? Object.defineProperty(l, a, {
            value: 1,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : l[a] = 1;
        class c extends s {
            constructor(e, t, i) {
                super(e, t),
                this.isMiddle = i
            }
        }
        function u(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        class g {
            constructor(e, t, i) {
                u(this, "pausePromise", void 0),
                u(this, "pauseResolve", void 0),
                u(this, "iterations", void 0),
                u(this, "directionFree", void 0),
                u(this, "success", void 0),
                u(this, "shouldStop", void 0),
                this.board = e,
                this.pieces = t,
                this.onBoardUpdated = i,
                this.iterations = 0,
                this.pieceLength = t.length,
                this.valid = !0,
                this.pieceNumber = 0,
                this.transformationNumber = 0,
                this.restrictedPieceNumber = 0,
                this.restrictedTransformationNumber = 0,
                this.time = (new Date).getTime(),
                this.history = [],
                this.middle = [];
                for (let e = this.board.length / 2 - 1; e < this.board.length / 2 + 1; e++)
                    for (let t = this.board[0].length / 2 - 1; t < this.board[0].length / 2 + 1; t++)
                        -1 != this.board[e][t] && this.middle.push(new s(t,e));
                this.emptySpots = [];
                for (let e = 0; e < this.board.length; e++)
                    for (let t = 0; t < this.board[0].length; t++)
                        0 == this.board[e][t] && this.emptySpots.push(new s(t,e));
                this.restrictedSpots = [];
                for (let e = 0; e < this.board.length; e++)
                    for (let t = 0; t < this.board[0].length; t++)
                        this.searchSurroundings(t, e);
                this.longSpaces = [];
                for (let e = 0; e < this.board.length; e++)
                    for (let t = 0; t < this.board[0].length; t++)
                        "horizontal" == this.checkLongSpace(t, e) && this.longSpaces.push(new s(t,e)),
                        "vertical" == this.checkLongSpace(t, e) && this.longSpaces.push(new s(t,e));
                this.firstAlgorithm = !!this.longSpaces.length
            }
            async solve() {
                return this.pieces.sort(((e,t)=>t.amount * t.cellCount - e.amount * e.cellCount)),
                this.pieces.push(new h([[]],0,-1)),
                this.restrictedSpots.sort(((e,t)=>t.spotsFilled - e.spotsFilled)),
                this.success = await this.solveInternal(),
                this.success
            }
            async solveInternal(e=3e4) {
                let t, i, n, r = [], o = 0;
                for (; this.pieces[0].amount > 0 || !this.valid; ) {
                    if (this.shouldStop)
                        return;
                    if (this.valid && 0 != this.restrictedSpots.length && this.pieces[this.restrictedPieceNumber].amount && 5 != this.directionFree && !this.firstAlgorithm)
                        this.restrictedPieceNumber != this.pieceLength && (n = this.restrictedSpots[0],
                        i = this.pieces[this.restrictedPieceNumber].restrictedTransformations[this.restrictedTransformationNumber],
                        this.determineDirectionFree(n),
                        this.isPlaceable(n, i) ? (r.push([0, 0, this.takeFromList(this.restrictedPieceNumber), [...this.restrictedSpots], n, this.restrictedPieceNumber, this.restrictedTransformationNumber, this.directionFree, [], 0, this.valid]),
                        this.restrictedSpots.splice(0, 1),
                        this.placePiece(n, i),
                        this.isValid(),
                        this.restrictedPieceNumber = 0,
                        this.restrictedTransformationNumber = 0) : this.changeIndex(!0));
                    else if (this.valid && this.pieces[this.pieceNumber].amount && (this.firstAlgorithm || 0 == this.restrictedSpots.length) && 5 != this.directionFree) {
                        if (this.directionFree = 0,
                        !this.firstAlgorithm)
                            for (o = 0; o < this.emptySpots.length && 0 != this.board[this.emptySpots[o].y][this.emptySpots[o].x]; )
                                o++;
                        if (o == this.emptySpots.length)
                            return !0;
                        if (n = this.emptySpots[o],
                        i = this.pieces[this.pieceNumber].transformations[this.transformationNumber],
                        this.isPlaceable(n, i)) {
                            let e = [];
                            for (let t = 0; t < this.longSpaces.length; t++)
                                e.push(this.longSpaces[t]);
                            if (r.push([this.pieceNumber, this.transformationNumber, this.takeFromList(this.pieceNumber), [...this.restrictedSpots], n, 0, 0, 0, e, o, this.valid]),
                            this.placePiece(n, i),
                            this.isValid(),
                            this.firstAlgorithm) {
                                for (; o < this.emptySpots.length && 0 != this.board[this.emptySpots[o].y][this.emptySpots[o].x]; )
                                    o++;
                                if (o == this.emptySpots.length)
                                    return !0
                            }
                            this.pieceNumber = 0,
                            this.transformationNumber = 0
                        } else
                            this.changeIndex(!1)
                    } else {
                        if (0 == r.length)
                            return !1;
                        this.valid || (this.valid = !0),
                        [this.pieceNumber,this.transformationNumber,t,this.restrictedSpots,n,this.restrictedPieceNumber,this.restrictedTransformationNumber,this.directionFree,this.longSpaces,o,this.valid] = r.pop(),
                        0 == this.directionFree ? (this.returnToList(this.pieceNumber, t),
                        this.takeBackPiece(n, this.pieces[this.pieceNumber].transformations[this.transformationNumber])) : (this.returnToList(this.restrictedPieceNumber, t),
                        this.takeBackPiece(n, this.pieces[this.restrictedPieceNumber].restrictedTransformations[this.restrictedTransformationNumber])),
                        this.firstAlgorithm = !(0 == this.longSpaces.length),
                        this.firstAlgorithm ? this.changeIndex(!1) : this.changeIndex(0 == !this.restrictedSpots.length)
                    }
                    this.iterations++,
                    this.iterations % e == 0 && (this.onBoardUpdated(),
                    await new Promise((e=>setTimeout(e, 0))),
                    await this.pausePromise)
                }
                return !0
            }
            takeFromList(e) {
                this.pieces[e].amount--;
                let t = this.pieces[e]
                  , i = e + 1;
                for (; t.amount * t.cellCount < this.pieces[i].amount * this.pieces[i].cellCount; )
                    i++;
                return this.pieces[e] = this.pieces[i - 1],
                this.pieces[i - 1] = t,
                i - 1 - e
            }
            returnToList(e, t) {
                let i = this.pieces[e];
                this.pieces[e] = this.pieces[e + t],
                this.pieces[e + t] = i,
                this.pieces[e].amount++
            }
            isValid() {
                if (0 == this.middle.length)
                    return !0;
                let e = 0;
                for (let t of this.middle)
                    this.board[t.y][t.x] > 0 && this.board[t.y][t.x] <= this.pieceLength && e++;
                this.valid = e != this.middle.length
            }
            isPlaceable(e, t) {
                if (!t)
                    return !1;
                for (let i of t.pointShape) {
                    let n, r;
                    if ([n,r] = this.determinePoint(e, t, i),
                    r >= this.board.length || r < 0 || n >= this.board[0].length || n < 0 || 0 != this.board[r][n])
                        return !1
                }
                return !0
            }
            placePiece(e, t) {
                let i = [];
                this.history[this.history.length] = [];
                for (let n of t.pointShape) {
                    let r, o;
                    [r,o] = this.determinePoint(e, t, n),
                    n.isMiddle ? this.board[o][r] = t.id + 18 : this.board[o][r] = t.id,
                    i.push(new s(r,o)),
                    this.history[this.history.length - 1].push(new s(r,o));
                    for (let e = 0; e < this.restrictedSpots.length; e++)
                        this.restrictedSpots[e].x == r && this.restrictedSpots[e].y == o && (this.restrictedSpots.splice(e, 1),
                        e--);
                    for (let e = 0; e < this.longSpaces.length; e++)
                        this.longSpaces[e].x == r && this.longSpaces[e].y == o && (this.longSpaces.splice(e, 1),
                        e--);
                    0 == this.longSpaces.length && (this.firstAlgorithm = !1)
                }
                for (let e of i)
                    this.searchSurroundings(e.x, e.y + 1),
                    this.searchSurroundings(e.x, e.y - 1),
                    this.searchSurroundings(e.x + 1, e.y),
                    this.searchSurroundings(e.x - 1, e.y);
                let n = [];
                for (let e = 0; e < this.restrictedSpots.length - 1; e++)
                    for (let t = e + 1; t < this.restrictedSpots.length; t++)
                        this.restrictedSpots[e].x == this.restrictedSpots[t].x && this.restrictedSpots[e].y == this.restrictedSpots[t].y && n.push(e);
                for (let e = n.length - 1; e >= 0; e--)
                    this.restrictedSpots.splice(n[e], 1);
                this.restrictedSpots.sort(((e,t)=>t.spotsFilled - e.spotsFilled))
            }
            takeBackPiece(e, t) {
                this.history.pop();
                for (let i of t.pointShape) {
                    let n, r;
                    [n,r] = this.determinePoint(e, t, i),
                    this.board[r][n] = 0
                }
            }
            searchSurroundings(e, t) {
                let i = 0;
                this.board[t] && 0 == this.board[t][e] && (this.board[t + 1] && 0 == this.board[t + 1][e] && i++,
                this.board[t - 1] && 0 == this.board[t - 1][e] && i++,
                this.board[t] && 0 == this.board[t][e + 1] && i++,
                this.board[t] && 0 == this.board[t][e - 1] && i++,
                i <= 1 && this.restrictedSpots.push(new m(e,t,4 - i)))
            }
            checkLongSpace(e, t) {
                return this.board[t + 1] && 0 == this.board[t + 1][e] && this.board[t - 1] && 0 == this.board[t - 1][e] && this.board[t] && 0 != this.board[t][e + 1] && this.board[t] && 0 != this.board[t][e - 1] ? "vertical" : this.board[t + 1] && 0 != this.board[t + 1][e] && this.board[t - 1] && 0 != this.board[t - 1][e] && this.board[t] && 0 == this.board[t][e + 1] && this.board[t] && 0 == this.board[t][e - 1] ? "horizontal" : void 0
            }
            changeIndex(e) {
                e ? this.restrictedTransformationNumber < this.pieces[this.restrictedPieceNumber].restrictedTransformations.length - 1 ? this.restrictedTransformationNumber++ : (this.restrictedPieceNumber++,
                this.restrictedTransformationNumber = 0) : this.transformationNumber < this.pieces[this.pieceNumber].transformations.length - 1 ? this.transformationNumber++ : (this.pieceNumber++,
                this.transformationNumber = 0)
            }
            determineDirectionFree(e) {
                this.board[e.y - 1] && 0 == this.board[e.y - 1][e.x] ? this.directionFree = 1 : this.board[e.y] && 0 == this.board[e.y][e.x + 1] ? this.directionFree = 2 : this.board[e.y + 1] && 0 == this.board[e.y + 1][e.x] ? this.directionFree = 3 : this.board[e.y] && 0 == this.board[e.y][e.x - 1] ? this.directionFree = 4 : this.directionFree = 5
            }
            determinePoint(e, t, i) {
                let n, r;
                return 0 == this.directionFree || 3 == this.directionFree || 5 == this.directionFree ? (n = e.x + i.x - t.offCenter,
                r = e.y + i.y) : 1 == this.directionFree ? (n = e.x - i.x + t.offCenter,
                r = e.y - i.y) : 2 == this.directionFree ? (n = e.x + i.y,
                r = e.y + i.x - t.offCenter) : (n = e.x - i.y,
                r = e.y - i.x + t.offCenter),
                [n, r]
            }
            pause() {
                this.time -= (new Date).getTime(),
                0 != this.iterations && (document.getElementById("iterations").style.visibility = "visible",
                document.getElementById("iterationsValue").innerText = `${this.iterations}`,
                document.getElementById("time").style.visibility = "visible",
                document.getElementById("timeValue").innerText = -this.time + "ms"),
                this.pausePromise = new Promise((e=>this.pauseResolve = e))
            }
            continue() {
                this.time += (new Date).getTime(),
                document.getElementById("iterations").style.visibility = "hidden",
                document.getElementById("time").style.visibility = "hidden",
                this.pauseResolve(),
                this.pausePromise = null
            }
            stop() {
                this.shouldStop = !0
            }
        }
        class m extends s {
            constructor(e, t, i) {
                super(e, t),
                this.spotsFilled = i
            }
        }
        const p = {
            GMS: {
                title: "Legion Solver",
                instructions: "Instructions:",
                instructionsSub1: "1. Click the grid spaces you want to be filled, the region click will help you fill it in faster.",
                instructionsSub2: "2. Input the amount of each shape you want to be filled in the board.",
                instructionsSub3: "3. The space that the pieces take up should equal the amount of grid spaces you filled, although the program will still try to run otherwise.",
                instructionsSub4: "4. When you press Start the program will try to fill the board spaces with the pieces you've chosen, click on Live Solve if you want to see the board filled in real time.",
                spacesToBeFilled: "Spaces to be Filled: ",
                boardSpacesFilled: "Board Spaces Filled: ",
                currentCaracterCountFiled: "Number of Characters: ",
                iterations: "Iterations: ",
                time: "Time: ",
                bigClick: "Region Click",
                liveSolve: "Live Solve",
                darkMode: "Dark Mode",
                start: "Start",
                pause: "Pause",
                continue: "Continue",
                reset: "Reset",
                clearPieces: "Clear Pieces",
                clearBoard: "Clear Board",
                failText: "No Solution Found",
                lvl60: "Lvl 60",
                lvl100: "Lvl 100",
                warriorPirate140: "Lvl 140 Warrior/Pirate",
                mageThiefArcher140: "Lvl 140 Mage/Thief/Archer",
                warrior200: "Lvl 200 Warrior",
                archer200: "Lvl 200 Archer",
                thiefLab200: "Lvl 200 Thief/Lab",
                mage200: "Lvl 200 Mage",
                pirate200: "Lvl 200 Pirate",
                warrior250: "Lvl 250 Warrior",
                archer250: "Lvl 250 Archer",
                thief250: "Lvl 250 Thief",
                mage250: "Lvl 250 Mage",
                pirate250: "Lvl 250 Pirate",
                xenon250: "Lvl 250 Xenon",
                enhancedLab200: "Lvl 200 Enhanced Lab",
                enhancedLab250: "Lvl 250 Enhanced Lab",
                lab250: "Lvl 250 Lab"
            },
            KMS: {
                title: "유니온 지도 메이커",
                instructions: "설명:",
                instructionsSub1: "1. 유니온 지도를 더 빨리 채우려면 지역선택 버튼을 활성화 한 후 지역을 선택하세요.",
                instructionsSub2: "2. 유니온 지도에 채우려는 직업의 수를 입력하세요.",
                instructionsSub3: "3. 산정된 공간은 선택된 공간의 양과 같아야 하며 같지 않다면 프로그램은 계속 반복 실행할 겁니다.",
                instructionsSub4: "4. 프로그램이 루트를 찾고 있을 때 해당 과정을 보고 싶다면 실시간 보기를 활성화해 줍니다.",
                spacesToBeFilled: "유니온 캐릭터 산정된 공간: ",
                boardSpacesFilled: "유니온 지도 선택된 공간: ",
                currentCaracterCountFiled: "현재 사용 중인 문자 수: ",
                iterations: "반복횟수: ",
                time: "소요시간: ",
                bigClick: "지역선택",
                liveSolve: "실시간 보기",
                darkMode: "다크모드",
                start: "시작",
                pause: "Pause",
                continue: "Continue",
                reset: "리셋",
                clearPieces: "캐릭터 초기화",
                clearBoard: "유니온 지도 초기화",
                failText: "루트를 찾지 못했습니다.",
                lvl60: "Lvl 60",
                lvl100: "Lvl 100",
                warriorPirate140: "Lvl 140 전사/해적",
                mageThiefArcher140: "Lvl 140 마법사/도적/궁수/메이플M(S)",
                warrior200: "Lvl 200 전사",
                archer200: "Lvl 200 궁수/메이플M(SS)",
                thiefLab200: "Lvl 200 도적/제논",
                mage200: "Lvl 200 마법사",
                pirate200: "Lvl 200 해적",
                warrior250: "Lvl 250 전사",
                archer250: "Lvl 250 궁수",
                thief250: "Lvl 250 도적",
                mage250: "Lvl 250 마법사",
                pirate250: "Lvl 250 해적",
                xenon250: "Lvl 250 제논",
                enhancedLab200: "Lvl 200 Enhanced Lab",
                enhancedLab250: "Lvl 250 Enhanced Lab",
                lab250: "Lvl 250 Lab"
            },
            JMS: {
                title: "ユニオンマップメーカー",
                instructions: "説明:",
                instructionsSub1: "1. ユニオンマップをもっと早く埋めるためには地域選択のボタンを活性化してから地域を選択してください。",
                instructionsSub2: "2. ユニオンマップに埋めようとする職業の数を入力してください。",
                instructionsSub3: "3. 算定された空間は選択された空間の量と同じでなければならず、同じでなければプログラムは繰り返します。",
                instructionsSub4: "4. プログラムがルートを探しているときにその状況を見たいなら、実時間見るボタンを活性化してください。",
                spacesToBeFilled: "キャラクターの算定された空間: ",
                boardSpacesFilled: "マップの選択された空間: ",
                currentCaracterCountFiled: "現在使用されている役割の数: ",
                iterations: "繰り返した数: ",
                time: "所要時間: ",
                bigClick: "地域選択",
                liveSolve: "実時間見る",
                darkMode: "ダークモード",
                start: "スタート",
                pause: "ポーズ",
                continue: "コンティニュー",
                reset: "リセット",
                clearPieces: "キャラクター初期化",
                clearBoard: "マップ初期化",
                failText: "ルートが見つかりませんでした",
                lvl60: "Lvl 60",
                lvl100: "Lvl 100",
                warriorPirate140: "Lvl 140 戦士/海賊",
                mageThiefArcher140: "Lvl 140 魔法使い/盗賊/弓",
                warrior200: "Lvl 200 戦士",
                archer200: "Lvl 200 弓",
                thiefLab200: "Lvl 200 盗賊/ゼノン",
                mage200: "Lvl 200 魔法使い",
                pirate200: "Lvl 200 海賊",
                warrior250: "Lvl 250 戦士",
                archer250: "Lvl 250 弓",
                thief250: "Lvl 250 盗賊",
                mage250: "Lvl 250 魔法使い",
                pirate250: "Lvl 250 海賊",
                xenon250: "Lvl 250 ゼノン",
                enhancedLab200: "Lvl 200 Enhanced Lab",
                enhancedLab250: "Lvl 250 Enhanced Lab",
                lab250: "Lvl 250 Lab"
            },
            TMS: {
                title: "聯盟戰地排序工具",
                instructions: "說明:",
                instructionsSub1: "1. 點選你所需要的格子，也可以使用區塊選擇以直接選取整個區塊。",
                instructionsSub2: "2. 輸入你擁有的拼圖數量。",
                instructionsSub3: "3. 確認可使用區塊數及可填入區塊數相等，否則程式將會無限循環。",
                instructionsSub4: "4. 點擊開始程式將使用你輸入的拼圖填滿區塊，點擊觀看過程可以觀看程式計算的過程。",
                spacesToBeFilled: "可填入區塊數: ",
                boardSpacesFilled: "可使用區塊數: ",
                currentCaracterCountFiled: "當前使用的角色數量: ",
                iterations: "嘗試次數: ",
                time: "花費時間: ",
                bigClick: "區塊選擇",
                liveSolve: "觀看過程",
                darkMode: "深色模式",
                start: "開始",
                pause: "暫停",
                continue: "繼續",
                reset: "重置",
                clearPieces: "清除擁有的拼圖",
                clearBoard: "清除面板",
                failText: "找不到結果",
                lvl60: "Lvl 60",
                lvl100: "Lvl 100",
                warriorPirate140: "Lvl 140 劍士/海盜",
                mageThiefArcher140: "Lvl 140 法師/盜賊/弓箭手",
                warrior200: "Lvl 200 劍士",
                archer200: "Lvl 200 弓箭手",
                thiefLab200: "Lvl 200 盜賊/Lab",
                mage200: "Lvl 200 法師",
                pirate200: "Lvl 200 海盜",
                warrior250: "Lvl 250 劍士",
                archer250: "Lvl 250 弓箭手",
                thief250: "Lvl 250 盜賊",
                mage250: "Lvl 250 法師",
                pirate250: "Lvl 250 海盜",
                xenon250: "Lvl 250 傑諾",
                enhancedLab200: "Lvl 200 強化型 Lab",
                enhancedLab250: "Lvl 250 強化型 Lab",
                lab250: "Lvl 250 Lab"
            },
            CMS: {
                title: "冒险岛联盟自动排列工具",
                instructions: "使用方法：",
                instructionsSub1: "1. 点击你想要使用的区块，或者可以使用选取整个区块功能。",
                instructionsSub2: "2. 输入你拥有的角色拼图数量。",
                instructionsSub3: "3. 必须要确定可使用的区块数量和可填入的区块数量相等，否则自动排列程序将陷入死循环。",
                instructionsSub4: "4. 只要点击开始，程序就会自动按照你输入的拼图数量填满区块。你也可以打开实时演算功能来查看过程。",
                spacesToBeFilled: "可填入的区块数量: ",
                boardSpacesFilled: "可使用的区块数量: ",
                currentCaracterCountFiled: "當当前使用的角色数量: ",
                iterations: "尝试次数: ",
                time: "消耗时间: ",
                bigClick: "选取整个区块",
                liveSolve: "实时演算",
                darkMode: "暗黑模式",
                start: "开始",
                pause: "暂停",
                continue: "继续",
                reset: "重置",
                clearPieces: "清除所有的拼图",
                clearBoard: "清除面板",
                failText: "找不到解",
                lvl60: "等级 60",
                lvl100: "等级 100",
                warriorPirate140: "等级 140 战士/海盗",
                mageThiefArcher140: "等级 140 魔法师/飞侠/尖兵/弓箭手",
                warrior200: "等级 200 战士",
                archer200: "等级 200 弓箭手",
                thiefLab200: "等级 200 飞侠/尖兵",
                mage200: "等级 200 魔法师",
                pirate200: "等级 200 海盗",
                warrior250: "等级 250 战士",
                archer250: "等级 250 弓箭手",
                thief250: "等级 250 飞侠",
                mage250: "等级 250 魔法师",
                pirate250: "等级 250 海盗",
                xenon250: "等级 250 尖兵",
                enhancedLab200: "Lvl 200 Enhanced Lab",
                enhancedLab250: "Lvl 250 Enhanced Lab",
                lab250: "Lvl 250 Lab"
            }
        };
        let f = b();
        function b() {
            const e = function() {
                let e;
                switch (window.navigator.userLanguage || window.navigator.language) {
                case "en":
                    e = "GMS";
                    break;
                case "ko":
                    e = "KMS";
                    break;
                case "ja":
                    e = "JMS";
                    break;
                case "cn":
                    e = "CMS";
                    break;
                default:
                    e = null
                }
                return e
            }();
            return localStorage.getItem("i18n") || e || "GMS"
        }
        function y(e) {
            return p[f][e]
        }
        function v(e, t) {
            const i = []
              , n = /^\s*$/;
            return function e(r) {
                if (3 == r.nodeType)
                    !t && n.test(r.nodeValue) || i.push(r);
                else
                    for (var o = 0, s = r.childNodes.length; o < s; ++o)
                        e(r.childNodes[o])
            }(e),
            i
        }
        document.getElementById("title").textContent = y("title"),
        v(document.getElementById("instructions"))[0].textContent = y("instructions"),
        v(document.getElementById("paragraph"))[0].textContent = y("instructionsSub1"),
        v(document.getElementById("paragraph"))[1].textContent = y("instructionsSub2"),
        v(document.getElementById("paragraph"))[2].textContent = y("instructionsSub3"),
        v(document.getElementById("paragraph"))[3].textContent = y("instructionsSub4"),
        v(document.getElementById("currentPieces"))[0].textContent = y("spacesToBeFilled"),
        v(document.getElementById("boardFilled"))[0].textContent = y("boardSpacesFilled"),
        v(document.getElementById("currentCaracterCount"))[0].textContent = y("currentCaracterCountFiled"),
        v(document.getElementById("iterations"))[0].textContent = y("iterations"),
        v(document.getElementById("time"))[0].textContent = y("time"),
        document.querySelector('label[for="bigClick"]').textContent = y("bigClick"),
        document.querySelector('label[for="liveSolve"]').textContent = y("liveSolve"),
        document.querySelector('label[for="darkMode"]').textContent = y("darkMode"),
        document.getElementById("boardButton").textContent = y("start"),
        document.getElementById("resetButton").textContent = y("reset"),
        document.getElementById("clearPieces").textContent = y("clearPieces"),
        document.getElementById("clearBoard").textContent = y("clearBoard"),
        document.getElementById("failText").textContent = y("failText"),
        document.getElementById("languageSelectBox").addEventListener("change", (function() {
            localStorage.setItem("i18n", this.value),
            location.reload()
        }
        )),
        document.getElementById(f).selected = !0;
        const x = [[[2]], [[2, 2]], [[1, 0], [2, 1]], [[1, 2, 1]], [[2, 2], [2, 2]], [[1, 2, 2, 1]], [[1, 0, 0], [1, 2, 1]], [[0, 1, 0], [1, 2, 1]], [[1, 2, 0], [0, 2, 1]], [[1, 1, 2], [0, 1, 1]], [[1, 1, 2, 1, 1]], [[0, 0, 1], [1, 2, 1], [0, 0, 1]], [[0, 1, 0], [1, 2, 1], [0, 1, 0]], [[1, 2, 0, 0], [0, 1, 1, 1]], [[1, 1, 0], [0, 2, 0], [0, 1, 1]]]
          , S = [[[1, 0, 0, 0], [0, 1, 2, 1]], [[1, 0, 0, 0, 1], [0, 1, 2, 1, 0]], [[1, 0, 1], [1, 2, 1]]]
          , L = [];
        for (let e of x)
            L.push(h.createPiece(e, 0));
        function B() {
            return !!["GMS", "TMS"].find((e=>e === b()))
        }
        if (B())
            for (let e of S)
                L.push(h.createPiece(e, 0));
        let I = new Map;
        I.set(-1, "white"),
        I.set(0, "grey");
        for (let e = 0; e < 2; e++)
            I.set(1 + 18 * e, "lightpink"),
            I.set(2 + 18 * e, "lightcoral"),
            I.set(3 + 18 * e, "indianred"),
            I.set(4 + 18 * e, "darkseagreen"),
            I.set(5 + 18 * e, "firebrick"),
            I.set(6 + 18 * e, "mediumseagreen"),
            I.set(7 + 18 * e, "purple"),
            I.set(8 + 18 * e, "dodgerblue"),
            I.set(9 + 18 * e, "lightsteelblue"),
            I.set(10 + 18 * e, "maroon"),
            I.set(11 + 18 * e, "green"),
            I.set(12 + 18 * e, "indigo"),
            I.set(13 + 18 * e, "blue"),
            I.set(14 + 18 * e, "cadetblue"),
            I.set(15 + 18 * e, "mediumpurple"),
            I.set(16 + 18 * e, "aquamarine"),
            I.set(17 + 18 * e, "aquamarine"),
            I.set(18 + 18 * e, "aquamarine");
        for (let e = 0; e < L.length; e++) {
            let t = `<tr>${'<td class="pieceCell"></td>'.repeat(L[e].shape[0].length)}</tr>`.repeat(L[e].shape.length);
            document.querySelector("#pieceForm form").innerHTML += `<div class="piece">\n        <div id="pieceDescription${e + 1}"></div>\n        <label for="piece${e + 1}">\n            <table id="pieceDisplay${e + 1}">\n                <tbody>${t}</tbody>\n            </table>\n        </label>\n        <input id="piece${e + 1}" type="number" min=0 value=0>\n    </div>`,
            document.getElementById(`pieceDisplay${e + 1}`).style.borderCollapse = "collapse",
            document.getElementById(`pieceDisplay${e + 1}`).style.borderSpacing = "0",
            document.getElementById(`pieceDescription${e + 1}`).style.paddingRight = "15px";
            for (let t = 0; t < L[e].shape.length; t++)
                for (let i = 0; i < L[e].shape[t].length; i++)
                    0 != L[e].shape[t][i] && (document.getElementById(`pieceDisplay${e + 1}`).getElementsByTagName("tr")[t].getElementsByTagName("td")[i].style.background = I.get(e + 1))
        }
        document.getElementById("pieceDescription1").textContent = y("lvl60"),
        document.getElementById("pieceDescription2").textContent = y("lvl100"),
        document.getElementById("pieceDescription3").textContent = y("warriorPirate140"),
        document.getElementById("pieceDescription4").textContent = y("mageThiefArcher140"),
        document.getElementById("pieceDescription5").textContent = y("warrior200"),
        document.getElementById("pieceDescription6").textContent = y("archer200"),
        document.getElementById("pieceDescription7").textContent = y("thiefLab200"),
        document.getElementById("pieceDescription8").textContent = y("mage200"),
        document.getElementById("pieceDescription9").textContent = y("pirate200"),
        document.getElementById("pieceDescription10").textContent = y("warrior250"),
        document.getElementById("pieceDescription11").textContent = y("archer250"),
        document.getElementById("pieceDescription12").textContent = y("thief250"),
        document.getElementById("pieceDescription13").textContent = y("mage250"),
        document.getElementById("pieceDescription14").textContent = y("pirate250"),
        document.getElementById("pieceDescription15").textContent = y("xenon250"),
        B() && (document.getElementById("pieceDescription16").textContent = y("enhancedLab200"),
        document.getElementById("pieceDescription17").textContent = y("enhancedLab250"),
        document.getElementById("pieceDescription18").textContent = y("lab250"));
        let C = 0
          , E = 0;
        localStorage.getItem("currentPieces") && (C = JSON.parse(localStorage.getItem("currentPieces")),
        document.getElementById("currentPiecesValue").innerText = `${C}`);
        let w = JSON.parse(localStorage.getItem("pieceAmounts"));
        if (w) {
            for (let e = 0; e < L.length; e++)
                document.getElementById(`piece${e + 1}`).value = w[e] || 0;
            T()
        }
        function T() {
            for (let e of L)
                e.amount = parseInt(document.getElementById(`piece${e.id}`).value) || 0;
            C = (0,
            d.sumBy)(L, (e=>e.cellCount * e.amount)),
            E = (0,
            d.sumBy)(L, (e=>e.amount)),
            localStorage.setItem("pieceAmounts", JSON.stringify(L.map((e=>e.amount)))),
            localStorage.setItem("currentPieces", JSON.stringify(C)),
            document.getElementById("currentPiecesValue").innerText = `${C}`,
            document.getElementById("currentCaracterCountValue").innerText = `${E}`
        }
        document.getElementById("pieceForm").addEventListener("input", T),
        document.getElementById("clearPieces").addEventListener("click", (function() {
            for (let e = 0; e < L.length; e++)
                document.getElementById(`piece${e + 1}`).value = 0;
            T()
        }
        ));
        let k = JSON.parse(localStorage.getItem("legionBoard"));
        if (!k) {
            k = [];
            for (let e = 0; e < 20; e++) {
                k[e] = [];
                for (let t = 0; t < 22; t++)
                    k[e][t] = -1
            }
        }
        let P = []
          , N = [];
        const F = "start"
          , M = "running"
          , D = "paused"
          , W = "completed";
        let O = F;
        const $ = [];
        for (let e = 0; e < 16; e++)
            $[e] = [];
        document.querySelector("#legionBoard tbody").innerHTML = k.map((e=>`<tr>${e.map((e=>'<td class="legionCell"></td>')).join("")}</tr>`)).join(""),
        X(),
        function() {
            for (let e = 0; e < k.length / 4; e++)
                for (let t = e; t < k.length / 2; t++)
                    $[0].push(new s(t,e)),
                    $[1].push(new s(e,t + 1)),
                    $[2].push(new s(e,k[0].length - 2 - t)),
                    $[3].push(new s(t,k[0].length - 1 - e)),
                    $[4].push(new s(k.length - 1 - t,k[0].length - 1 - e)),
                    $[5].push(new s(k.length - 1 - e,k[0].length - 2 - t)),
                    $[6].push(new s(k.length - 1 - e,t + 1)),
                    $[7].push(new s(k.length - 1 - t,e));
            for (let e = k.length / 4; e < k.length / 2; e++)
                for (let t = e; t < k.length / 2; t++)
                    $[8].push(new s(t,e)),
                    $[9].push(new s(e,t + 1)),
                    $[10].push(new s(3 * k.length / 4 - 1 - t,k.length / 4 + 1 + e)),
                    $[11].push(new s(t,k[0].length - 1 - e)),
                    $[12].push(new s(k.length - 1 - t,k[0].length - 1 - e)),
                    $[13].push(new s(t + k.length / 4,e + k.length / 4 + 1)),
                    $[14].push(new s(t + k.length / 4,3 * k.length / 4 - e)),
                    $[15].push(new s(k.length - t - 1,e))
        }();
        let A = 0;
        localStorage.getItem("boardFilled") && (A = JSON.parse(localStorage.getItem("boardFilled")),
        document.getElementById("boardFilledValue").innerText = `${A}`);
        let J = !1;
        localStorage.getItem("isBigClick") && (document.getElementById("bigClick").checked = JSON.parse(localStorage.getItem("isBigClick")),
        JSON.parse(localStorage.getItem("isBigClick")) && Y());
        let j = !1;
        localStorage.getItem("isLiveSolve") && (document.getElementById("liveSolve").checked = JSON.parse(localStorage.getItem("isLiveSolve")),
        JSON.parse(localStorage.getItem("isLiveSolve")) && ee()),
        document.getElementById("bigClick").addEventListener("click", Y),
        document.getElementById("liveSolve").addEventListener("click", ee),
        document.getElementById("clearBoard").addEventListener("click", (function() {
            for (let e = 0; e < k.length; e++)
                for (let t = 0; t < k[0].length; t++)
                    k[e][t] = -1,
                    z(e, t).style.background = I.get(k[e][t]);
            A = 0,
            localStorage.setItem("legionBoard", JSON.stringify(k)),
            localStorage.setItem("boardFilled", JSON.stringify(0)),
            document.getElementById("boardFilledValue").innerText = `${A}`
        }
        )),
        document.getElementById("boardButton").addEventListener("click", (async function(e) {
            switch (O) {
            case F:
                e.target.innerText = y("pause"),
                document.getElementById("clearBoard").disabled = !0,
                O = M,
                await async function() {
                    if (0 == A && currentPieces > 0)
                        return !1;
                    let e = [];
                    for (let t = 0; t < k.length; t++) {
                        e[t] = [];
                        for (let i = 0; i < k[0].length; i++)
                            e[t][i] = k[k.length - 1 - t][k[0].length - 1 - i]
                    }
                    let t = [];
                    for (let e = 0; e < k[0].length; e++) {
                        t[e] = [];
                        for (let i = 0; i < k.length; i++)
                            t[e][i] = k[k.length - i - 1][e]
                    }
                    let i = [];
                    for (let e = 0; e < k[0].length; e++) {
                        i[e] = [];
                        for (let t = 0; t < k.length; t++)
                            i[e][t] = k[t][k[0].length - 1 - e]
                    }
                    N = [],
                    P.push(new g(k,_.cloneDeep(L),ie)),
                    P.push(new g(t,_.cloneDeep(L),(()=>!1))),
                    P.push(new g(e,_.cloneDeep(L),(()=>!1))),
                    P.push(new g(i,_.cloneDeep(L),(()=>!1)));
                    let n = 0 != P[0].longSpaces.length;
                    const r = P[0].solve();
                    let o, s;
                    if (n) {
                        const e = P[1].solve()
                          , t = P[2].solve()
                          , i = P[3].solve();
                        o = await Promise.race([r, e, t, i])
                    } else
                        o = await r;
                    for (let e of P)
                        e.stop();
                    if (void 0 !== P[0].success) {
                        for (let e = 0; e < P[0].board.length; e++)
                            for (let t = 0; t < P[0].board[0].length; t++)
                                k[e][t] = P[0].board[e][t];
                        s = P[0],
                        N = P[0].history
                    } else if (void 0 !== P[1].success) {
                        for (let e = 0; e < P[1].board[0].length; e++)
                            for (let t = 0; t < P[1].board.length; t++)
                                k[e][t] = P[1].board[t][P[1].board[0].length - 1 - e];
                        for (let e of P[1].history)
                            for (let t of e) {
                                let e = t.y;
                                t.y = P[1].board[0].length - 1 - t.x,
                                t.x = e
                            }
                        s = P[1],
                        N = P[1].history
                    } else if (void 0 !== P[2].success) {
                        for (let e = 0; e < P[2].board.length; e++)
                            for (let t = 0; t < P[2].board[0].length; t++)
                                k[e][t] = P[2].board[P[2].board.length - 1 - e][P[2].board[0].length - 1 - t];
                        for (let e of P[2].history)
                            for (let t of e)
                                t.y = P[2].board.length - 1 - t.y,
                                t.x = P[2].board[0].length - 1 - t.x;
                        s = P[2],
                        N = P[2].history
                    } else if (void 0 !== P[3].success) {
                        for (let e = 0; e < P[3].board[0].length; e++)
                            for (let t = 0; t < P[3].board.length; t++)
                                k[e][t] = P[3].board[P[3].board.length - t - 1][e];
                        for (let e of P[3].history)
                            for (let t of e) {
                                let e = t.x;
                                t.x = P[3].board.length - 1 - t.y,
                                t.y = e
                            }
                        s = P[3],
                        N = P[3].history
                    }
                    return document.getElementById("iterations").style.visibility = "visible",
                    document.getElementById("iterationsValue").innerText = `${s.iterations}`,
                    document.getElementById("time").style.visibility = "visible",
                    document.getElementById("timeValue").innerText = (new Date).getTime() - s.time + "ms",
                    o && X(),
                    o
                }() || (document.getElementById("failText").style.visibility = "visible"),
                e.target.innerText = y("reset"),
                O = W;
                break;
            case M:
                e.target.innerText = y("continue");
                for (let e of P)
                    e.pause();
                O = D,
                document.getElementById("resetButton").style.visibility = "visible";
                break;
            case D:
                e.target.innerText = y("pause"),
                N = [];
                for (let e of P)
                    e.continue();
                O = M,
                document.getElementById("resetButton").style.visibility = "hidden";
                break;
            case W:
                te()
            }
        }
        )),
        document.getElementById("resetButton").addEventListener("click", te),
        document.getElementById("darkMode").addEventListener("click", Q);
        let R, V = !1;
        for (let e = 0; e < k.length; e++)
            for (let t = 0; t < k[0].length; t++) {
                let i = z(e, t);
                i.addEventListener("mousedown", (()=>{
                    R = 0 == k[e][t] ? -1 : 0,
                    H(e, t, R),
                    V = !0
                }
                )),
                i.addEventListener("mouseover", (()=>{
                    V ? H(e, t, R) : K(e, t)
                }
                )),
                i.addEventListener("mouseout", (()=>{
                    V || U(e, t)
                }
                ))
            }
        function q() {
            for (let e = 0; e < k.length; e++)
                for (let t = 0; t < k[0].length; t++)
                    z(e, t).style.borderWidth = "1px";
            for (let e = 0; e < k[0].length / 2; e++)
                z(e, e).style.borderTopWidth = "3px",
                z(e, e).style.borderRightWidth = "3px",
                z(k.length - e - 1, e).style.borderBottomWidth = "3px",
                z(k.length - e - 1, e).style.borderRightWidth = "3px",
                z(e, k[0].length - e - 1).style.borderTopWidth = "3px",
                z(e, k[0].length - e - 1).style.borderLeftWidth = "3px",
                z(k.length - e - 1, k[0].length - e - 1).style.borderBottomWidth = "3px",
                z(k.length - e - 1, k[0].length - e - 1).style.borderLeftWidth = "3px";
            for (let e = 0; e < k.length; e++)
                z(e, 0).style.borderLeftWidth = "3px",
                z(e, k[0].length / 2).style.borderLeftWidth = "3px",
                z(e, k[0].length - 1).style.borderRightWidth = "3px";
            for (let e = 0; e < k[0].length; e++)
                z(0, e).style.borderTopWidth = "3px",
                z(k.length / 2, e).style.borderTopWidth = "3px",
                z(k.length - 1, e).style.borderBottomWidth = "3px";
            for (let e = k.length / 4; e < 3 * k.length / 4; e++)
                z(e, Math.floor(k[0].length / 4)).style.borderLeftWidth = "3px",
                z(e, Math.floor(3 * k[0].length / 4)).style.borderRightWidth = "3px";
            for (let e = Math.ceil(k[0].length / 4); e < Math.floor(3 * k[0].length / 4); e++)
                z(k.length / 4, e).style.borderTopWidth = "3px",
                z(3 * k.length / 4, e).style.borderTopWidth = "3px"
        }
        document.documentElement.addEventListener("mouseup", (()=>{
            V = !1
        }
        )),
        document.getElementById("legion").addEventListener("dragstart", (e=>e.preventDefault()));
        let G = !1;
        function Z(e, t) {
            for (let i = 0; i < $.length; i++)
                for (let n of $[i])
                    if (n.x == e && n.y == t)
                        return i
        }
        function z(e, t) {
            return document.getElementById("legionBoard").getElementsByTagName("tr")[e].getElementsByTagName("td")[t]
        }
        function H(e, t, i) {
            if (O == F) {
                if (J)
                    if (0 == i)
                        for (let i of $[Z(e, t)])
                            z(i.x, i.y).style.background = I.get(0),
                            -1 == k[i.x][i.y] && A++,
                            k[i.x][i.y] = 0;
                    else
                        for (let i of $[Z(e, t)])
                            z(i.x, i.y).style.background = I.get(-1),
                            0 == k[i.x][i.y] && A--,
                            k[i.x][i.y] = -1;
                else {
                    let n = z(e, t);
                    -1 == i ? -1 != k[e][t] && (k[e][t] = -1,
                    n.style.background = I.get(-1),
                    A--) : 0 != k[e][t] && (k[e][t] = 0,
                    n.style.background = I.get(0),
                    A++)
                }
                localStorage.setItem("legionBoard", JSON.stringify(k)),
                localStorage.setItem("boardFilled", JSON.stringify(A)),
                document.getElementById("boardFilledValue").innerText = `${A}`
            }
        }
        function K(e, t) {
            if (O == F)
                if (J)
                    for (let i of $[Z(e, t)])
                        -1 == k[i.x][i.y] ? z(i.x, i.y).style.background = G ? "dimgrey" : "silver" : z(i.x, i.y).style.background = G ? "rgb(20, 20, 20)" : "dimgrey";
                else
                    -1 == k[e][t] ? z(e, t).style.background = G ? "dimgrey" : "silver" : z(e, t).style.background = G ? "rgb(20, 20, 20)" : "dimgrey"
        }
        function U(e, t) {
            if (O == F)
                if (J)
                    for (let i of $[Z(e, t)])
                        -1 == k[i.x][i.y] ? z(i.x, i.y).style.background = I.get(-1) : z(i.x, i.y).style.background = I.get(0);
                else
                    -1 == k[e][t] ? z(e, t).style.background = I.get(-1) : z(e, t).style.background = I.get(0)
        }
        function X() {
            q(),
            function() {
                let e;
                for (let t = 0; t < k.length; t++)
                    for (let i = 0; i < k[0].length; i++)
                        e = k[t][i],
                        z(t, i).style.background = I.get(e);
                0 == N.length && P[0] && (N = P[0].history);
                for (let e of N)
                    for (let t = 0; t < e.length; t++) {
                        k[e[t].y][e[t].x - 1] > 0 && ("3px" == z(e[t].y, e[t].x).style.borderLeftWidth || "3px" == z(e[t].y, e[t].x - 1).style.borderRightWidth) && (z(e[t].y, e[t].x).style.borderLeftWidth = "1px",
                        z(e[t].y, e[t].x - 1).style.borderRightWidth = "1px"),
                        k[e[t].y - 1] && k[e[t].y - 1][e[t].x] > 0 && ("3px" == z(e[t].y, e[t].x).style.borderTopWidth || "3px" == z(e[t].y - 1, e[t].x).style.borderBottomWidth) && (z(e[t].y, e[t].x).style.borderTopWidth = "1px",
                        z(e[t].y - 1, e[t].x).style.borderBottomWidth = "1px");
                        for (let i = 0; i < e.length; i++)
                            t != i && e[t].x - 1 == e[i].x && e[t].y == e[i].y && (z(e[t].y, e[t].x).style.borderLeftWidth = "0px",
                            k[0][e[t].x - 1] && (z(e[t].y, e[t].x - 1).style.borderRightWidth = "0px")),
                            t != i && e[t].x == e[i].x && e[t].y - 1 == e[i].y && (z(e[t].y, e[t].x).style.borderTopWidth = "0px",
                            k[e[t].y - 1] && (z(e[t].y - 1, e[t].x).style.borderBottomWidth = "0px"))
                    }
            }()
        }
        function Q() {
            let e, t;
            if (G = !G,
            localStorage.setItem("isDarkMode", JSON.stringify(G)),
            G) {
                t = "white",
                document.getElementById("body").style.backgroundColor = "rgb(54, 57, 63)";
                for (let e = 0; e < L.length; e++)
                    document.getElementById(`piece${e + 1}`).style.backgroundColor = "silver";
                I.set(-1, "grey"),
                I.set(0, "rgb(50, 50, 50)")
            } else {
                t = "black",
                document.getElementById("body").style.backgroundColor = "white";
                for (let e = 0; e < L.length; e++)
                    document.getElementById(`piece${e + 1}`).style.backgroundColor = "white";
                I.set(-1, "white"),
                I.set(0, "grey")
            }
            X();
            for (let i = 0; i < k.length; i++)
                for (let n = 0; n < k[0].length; n++)
                    e = z(i, n),
                    e.style.borderTopColor != t && (e.style.borderTopColor = t),
                    e.style.borderBottomColor != t && (e.style.borderBottomColor = t),
                    e.style.borderRightColor != t && (e.style.borderRightColor = t),
                    e.style.borderLeftColor != t && (e.style.borderLeftColor = t);
            document.getElementById("body").style.color = t
        }
        function Y() {
            J = !J,
            localStorage.setItem("isBigClick", JSON.stringify(J))
        }
        function ee() {
            j = !j,
            localStorage.setItem("isLiveSolve", JSON.stringify(j)),
            j && O != W && X()
        }
        function te() {
            !function() {
                for (let e = 0; e < P.length; e++)
                    for (let t = 0; t < P[e].board.length; t++)
                        for (let i = 0; i < P[e].board[0].length; i++)
                            0 == e ? (z(t, i).style.borderWidth = "1px",
                            P[e].board[t][i] >= 0 && (z(t, i).style.background = I.get(0),
                            P[e].board[t][i] = 0)) : P[e].board[t][i] >= 0 && (P[e].board[t][i] = 0);
                q(),
                P = []
            }(),
            document.getElementById("clearBoard").disabled = !1,
            document.getElementById("boardButton").innerText = y("start"),
            document.getElementById("resetButton").style.visibility = "hidden",
            document.getElementById("iterations").style.visibility = "hidden",
            document.getElementById("time").style.visibility = "hidden",
            document.getElementById("failText").style.visibility = "hidden",
            N = [],
            O = F
        }
        function ie() {
            j && X()
        }
        localStorage.getItem("isDarkMode") && (document.getElementById("darkMode").checked = JSON.parse(localStorage.getItem("isDarkMode")),
        JSON.parse(localStorage.getItem("isDarkMode")) && Q())
    }
    ,
    28: (e,t,i)=>{
        "use strict";
        i.d(t, {
            Z: ()=>o
        });
        var n = i(645)
          , r = i.n(n)()((function(e) {
            return e[1]
        }
        ));
        r.push([e.id, "body {\n    display: flex;\n    flex-direction: column;\n}\n\nform {\n    margin-bottom: 0;\n}\n\n#title {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    margin-top: 0;\n}\n\n#header {\n    display: flex;\n    justify-content: flex-end;\n}\n\n#subtitle {\n    text-align: center;\n}\n\n#legionBoard {\n    border-spacing: 0;\n    border-collapse: collapse;\n}\n\n#legionBoard td.legionCell {\n    width: 25px;\n    height: 27px;\n    border-style: solid;\n    border-width: 1px;\n}\n\n#legion {\n    display: flex;\n    flex-direction: column;\n}\n\n#legionFooter {\n    margin-top: 10px;\n}\n\n#options {\n    display: flex;\n    flex-direction: column;\n    text-align: end;\n}\n\n#checkboxes {\n    margin-bottom: 10px;\n}\n\n#darkModeLabel {\n    padding-top: 10px;\n}\n\n#iterationTime {\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n}\n\n#iterations, #time, #resetButton {\n  visibility: hidden;\n}\n\n#boardFilled {\n    margin-bottom: 7px;\n}\n\n#currentCaracterCount {\n    margin-bottom: 7px;\n}\n\n#middlelabels {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n#pieceForm {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-end;\n    padding-right: 20px;\n}\n\n#pieceForm td.pieceCell {\n    width: 7px;\n    height: 9px;\n    border-style: solid;\n    border-width: 0px;\n}\n\n.piece {\n    display: flex;\n    flex-direction: row;\n    margin-bottom: 15px;\n    justify-content: flex-end;\n}\n\n#resetButton {\n    margin-top: 5px;\n}\n\n#failText {\n    text-align: right;\n    visibility: hidden;\n}\n\n#bigClick, #liveSolve {\n    margin-left: 20px;\n}\n\n#pieceForm input {\n    width: 50px;\n    height: 20px;\n    margin-left: 10px;\n}\n\n.centerMiddleChild {\n    display: flex;\n}\n\n.centerMiddleChild > :nth-child(1), .centerMiddleChild > :nth-child(3) {\n    flex: 1;\n}\n\n#instructions {\n    margin-left: 30px;\n}\n\n#paragraph {\n    padding-right: 80px;\n}\n\n#currentPieces {\n    white-space: nowrap;\n}", ""]);
        const o = r
    }
}, 0, [[372, 666, 736]]]);
