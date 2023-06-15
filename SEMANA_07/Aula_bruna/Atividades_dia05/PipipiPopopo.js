function jogoPi (qnt,pi) {
    seqPI = [];
    for (var cont = 1; cont <=qnt; cont++) {
        if (cont % pi === 0) {
            seqPI.push("PI");
        }
        else {
            seqPI.push(cont);}
        }
        return seqPI;
    }

    // console.log(jogoPI(10,2));

    function jogoPi(qnt, pi, po) {
        for (var cont = 2; cont <=qnt; cont++) {
            if (cont % pi === 0) {
                seqPI.push("PI");
            }
            else {
                seqPI.push(cont);}
            }
            return seqPI;

        }
        for (var cont = 3; cont <=qnt; cont++) {
            if (cont % pi === 0) {
                seqPI.push("Po");
            }
            else {
                seqPI.push(cont);}
            }
            return seqPI;

        for (var cont = 2,3; cont <=qnt; cont++) {
            if (cont % pi === 0) {
                seqPI.push("Pum");
                }
            else {
                seqPI.push(cont);}
                }
            return seqPI;
        
        
            console.log(jogoPI(1,2,3,4,5,6,7,8,9,10,11));