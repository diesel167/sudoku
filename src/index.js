module.exports = function solveSudoku(matrix) {

    let indic=false; //indicator for next loop is needed

    //find solved values in selected row
    let rowContent=(i)=>{
        let content=[];
        for(let j=0;j<9;j++) {
            if (matrix[i][j] !== 0 && !matrix[i][j].length) {
                content.push(matrix[i][j])
            }
        }

        return content;
    };
    //find solved values in selected col
    let colContent=(j)=>{
        let content=[];
        for(let i=0;i<9;i++) {
            if (matrix[i][j] !== 0 && !matrix[i][j].length) {
                content.push(matrix[i][j])
            }
        }
        return content;
    };

    //find solved values in selected section
    let sectContent=(i,j)=>{
        //find area of selected section
        area=(a)=>{
            if(a%3===1){
                return[a-1,a+1];
            }
            else if(a%3===2){
                return[a-2,a];
            }
            else{
                return[a,a+2];
            }
        };
        let ix=area(i);
        let jx=area(j);
        let content=[];
        for(let i=ix[0];i<=ix[1];i++){
            for(let j=jx[0];j<=jx[1];j++){
                if(matrix[i][j] !== 0 && !matrix[i][j].length){
                    content.push(matrix[i][j]);
                }
            }
        }
        return content;
    };

    //find unique values in a in comparison with b
    let arrayDiff=(a,b)=>{
        let temp=[];
        for(let i=0;i<a.length;i++){
            if(!b.includes(a[i])){
                temp.push(a[i]);
            }
        }


        if(a.length!==temp.length){
            indic=true;
        }
        return temp;
    };

    //find values for one item
    let solveSingle=(i,j)=>{
        if(matrix[i][j]===0){
            matrix[i][j]=[1,2,3,4,5,6,7,8,9];
        }
        matrix[i][j]=arrayDiff(matrix[i][j],rowContent(i));
        matrix[i][j]=arrayDiff(matrix[i][j],colContent(j));
        matrix[i][j]=arrayDiff(matrix[i][j],sectContent(i,j));
        if(matrix[i][j].length===1){
            matrix[i][j]=matrix[i][j][0];
            return 1;
        }
        return 0;
    };


    do{
        indic=false;
        for(let i=0;i<9;i++){
            for(let j=0;j<9;j++){
                if(matrix[i][j].length>1||matrix[i][j]===0){
                    solveSingle(i,j);

                }
            }
        }
    }
    while(indic===true);

    return matrix;
};
