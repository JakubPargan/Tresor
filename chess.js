<!-- Füge chessboard.js und chess.js Bibliotheken in dein HTML ein -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chessboardjs/1.0.0/chessboard-1.0.0.min.js"></script>

<div id="board1" style="width: 400px"></div>

<script>
// chess.js und chessboard.js Initialisierung
const board1 = Chessboard('board1', {
    draggable: true,
    dropOffBoard: 'trash',
    sparePieces: true
});

const game = new Chess();

board1.position(game.fen());

// Du kannst weitere Logik hier hinzufügen, um das Schachspiel vollständig zu steuern.
</script>
