//C++ code to clearly explain working of sudoku web solver
#include<bits/stdc++.h>
using namespace std;

bool CanPlace (int mat [] [9] , int i , int j , int N , int no) {

    for (int x = 0 ; x < N ; x++) {
        //Row and Column Check
        if (mat [x] [j] == no || mat [i] [x] == no) {
            return false;
        }

        int rn = sqrt (N);
        int sx = (i / rn) * rn;
        int sy = (j / rn) * rn;

        for (int x = sx ; x < sx + rn ; x++) {
            for (int y = sy ; y < sy + rn ; y++) {
                if (mat [x] [y] == no) {
                    return false;
                }
            }
        }
    }

    return true;
}

bool SolveSudoku (int mat [] [9] , int i , int j , int N) {
    //Base Case
    if (i == N) {
        //Print the matrix
        for (int a = 0 ; a < N ; a++) {
            for (int b = 0 ; b < N ; b++) {
                cout<< mat [a] [b]<<" ";
            }
            cout<<endl;
        }

        return true;
    }

    //Case End Row
    if (j == N) {
        return SolveSudoku (mat , i + 1 , 0 , N);
    }

    //Skip the pre filled
    if (mat [i] [j] != 0) {
        return SolveSudoku (mat , i , j + 1 , N);
    }

    //Recursive Case
    //Fill the current cell with possible options
    for (int no = 1 ; no <= N ; no++) {
        if (CanPlace (mat , i , j , N , no)) {
            //Assume
            mat [i] [j] = no;

            bool couldWeSolve = SolveSudoku (mat , i , j + 1 , N);
            if (couldWeSolve == true) {
                return true;
            }
        }
    }

    //Backtracking
    mat [i] [j] = 0;
    return false;
}

int main () {
    int mat [9] [9] = {
        {5 , 3 , 0 , 0 , 7 , 0 , 0 , 0 , 0},
        {6 , 0 , 0 , 1 , 9 , 5 , 0 , 0 , 0},
        {0 , 9 , 8 , 0 , 0 , 0 , 0 , 6 , 0},
        {8 , 0 , 0 , 0 , 6 , 0 , 0 , 0 , 3},
        {4 , 0 , 0 , 8 , 0 , 3 , 0 , 0 , 1},
        {7 , 0 , 0 , 0 , 2 , 0 , 0 , 0 , 6},
        {0 , 6 , 0 , 0 , 0 , 0 , 2 , 8 , 0},
        {0 , 0 , 0 , 4 , 1 , 9 , 0 , 0 , 5},
        {0 , 0 , 0 , 0 , 8 , 0 , 0 , 7 , 9}
    };

    SolveSudoku (mat , 0 , 0 , 9);

    return 0;
}