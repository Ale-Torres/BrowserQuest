  
(function(undefined) {  
    /**
     * A* (A-Star) algorithm for a path finder
     * @author  Andrea Giammarchi
     * @license Mit Style License
     */
    function diagonalSuccessors($NSEW, NSEW, grid, result, i) {
        $N = $NSEW[0];
        $S = $NSEW[1];
        $E = $NSEW[2];
        $W = $NSEW[3];
        N = NSEW[0];
        S = NSEW[1];
        E = NSEW[2];
        W = NSEW[3];

        if($N) {
            $E && !grid[N][E] && (result[i++] = {x:E, y:N});
            $W && !grid[N][W] && (result[i++] = {x:W, y:N});
        }
        if($S){
            $E && !grid[S][E] && (result[i++] = {x:E, y:S});
            $W && !grid[S][W] && (result[i++] = {x:W, y:S});
        }
        return result;
    }

    function diagonalSuccessorsFree($NSEW, NSEW, grid, result, i) {
        N = NSEW[0];
        S = NSEW[1];
        E = NSEW[2];
        W = NSEW[3];

        rows = grid.length;
        cols = grid[0].length;

        $N = N > -1;
        $S = S < rows;
        $E = E < cols;
        $W = W > -1;
        if($E) {
            $N && !grid[N][E] && (result[i++] = {x:E, y:N});
            $S && !grid[S][E] && (result[i++] = {x:E, y:S});
        }
        if($W) {
            $N && !grid[N][W] && (result[i++] = {x:W, y:N});
            $S && !grid[S][W] && (result[i++] = {x:W, y:S});
        }
        return result;
    }

    function nothingToDo($NSEW, NSEW, grid, result, i) {
        return result;
    }

    function successors(find, x, y, grid){

        //Get dimensions of the grid
        var rows = grid.length;
        var cols = grid[0].length;

        var
            N = y - 1,
            S = y + 1,
            E = x + 1,
            W = x - 1,
            $N = N > -1 && !grid[N][x],
            $S = S < rows && !grid[S][x],
            $E = E < cols && !grid[y][E],
            $W = W > -1 && !grid[y][W],
            result = [],
            i = 0
        ;
        $N && (result[i++] = {x:x, y:N});
        $E && (result[i++] = {x:E, y:y});
        $S && (result[i++] = {x:x, y:S});
        $W && (result[i++] = {x:W, y:y});
        $NSEW = [$N, $S, $E, $W];
        NSEW = [N, S, E, W];
        return find($NSEW, NSEW, grid, result, i);
    }

    function diagonal(start, end, f1, f2) {
        return f2(f1(start.x - end.x), f1(start.y - end.y));
    }

    function euclidean(start, end, f1, f2) {
        var
            x = start.x - end.x,
            y = start.y - end.y
        ;
        return f2(x * x + y * y);
    }

    function manhattan(start, end, f1, f2) {
        return f1(start.x - end.x) + f1(start.y - end.y);
    }

    function AStar(grid, start, end, f) {
        var
            cols = grid[0].length,
            rows = grid.length,
            limit = cols * rows,
            f1 = Math.abs,
            f2 = Math.max,
            list = {},
            result = [],
            open = [{x:start[0], y:start[1], f:0, g:0, v:start[0]+start[1]*cols}],
            length = 1,
            adj, distance, find, i, j, max, min, current, next
        ;
        end = {x:end[0], y:end[1], v:end[0]+end[1]*cols};
        switch (f) {
            case "Diagonal":
                find = diagonalSuccessors;
            case "DiagonalFree":
                distance = diagonal;
                break;
            case "Euclidean":
                find = diagonalSuccessors;
            case "EuclideanFree":
                f2 = Math.sqrt;
                distance = euclidean;
                break;
            default:
                distance = manhattan;
                find = nothingToDo;
                break;
        }
        find || (find = diagonalSuccessorsFree);
        do {
            max = limit;
            min = 0;
            for(i = 0; i < length; ++i) {
                if((f = open[i].f) < max) {
                    max = f;
                    min = i;
                }
            };
            current = open.splice(min, 1)[0];
            if (current.v != end.v) {
                --length;
                next = successors(find, current.x, current.y, grid);
                for(i = 0, j = next.length; i < j; ++i){
                    (adj = next[i]).p = current;
                    adj.f = adj.g = 0;
                    adj.v = adj.x + adj.y * cols;
                    if(!(adj.v in list)){
                        adj.f = (adj.g = current.g + distance(adj, current, f1, f2)) + distance(adj, end, f1, f2);
                        open[length++] = adj;
                        list[adj.v] = 1;
                    }
                }
            } else {
                i = length = 0;
                do {
                    result[i++] = [current.x, current.y];
                } while (current = current.p);
                result.reverse();
            }
        } while (length);
        return result;
    }

    if (typeof window === "undefined") {
        exports.AStar = AStar;
    } else {
        window.AStar = AStar;
    }

}());




