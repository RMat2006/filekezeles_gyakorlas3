const getMethod = async(url)=>{
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("GET hiba: ", response.status);
        }
        return await response.json();
    }catch(error){
        throw new Error("GET hiba: ", error.message);
    }
}



document.addEventListener('DOMContentLoaded', async ()=>{
    oldalbetoltes();
    document.getElementById('select').addEventListener('change', async (event)=>{
        selectKivalaszt(event.target.value)
    })

    async function oldalbetoltes(){
        try{
            const getResponseMinden = await getMethod('/api/getallstat');
            let select = document.getElementById('select');
            let tomb = getResponseMinden.content;
            console.log(tomb)
            for(let i=0;i<tomb.telepules.length;i++){
                const opt = document.createElement('option');
                opt.innerText = tomb.telepules[i].telepaz;
                select.appendChild(opt);
            }
        }catch(error){
            console.error("GET hiba: ", error.message)
        }
        
    }

    async function selectKivalaszt(event){
        try{
            const response = await getMethod(`/api/getstat/${event}`);
            console.log(response)
            const form = document.getElementById('form');
            const table = document.createElement('table');
            const tr = document.createElement('tr');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');
            const td6 = document.createElement('td');
            const td7 = document.createElement('td');
            const td = document.createElement('td');
            td.innerText = "telepaz"
            td2.innerText = "megnevezes"
            td3.innerText = "rang"
            td4.innerText = "kisterseg"
            td5.innerText = "terulet"
            td6.innerText = "nepesseg"
            td7.innerText = "lakas"

            const tr2 = document.createElement('tr')
            const td8 = document.createElement('td');
            td8.innerText = response.adatok.telepaz
            const td9 = document.createElement('td');
            td9.innerText = response.adatok.megnevezes
            const td10 = document.createElement('td');
            td10.innerText = response.adatok.rang
            const td11= document.createElement('td');
            td11.innerText = response.adatok.kisterseg
            const td12= document.createElement('td');
            td12.innerText = response.adatok.terulet
            const td13= document.createElement('td');
            td13.innerText = response.adatok.nepesseg
            const td14= document.createElement('td');
            td14.innerText = response.adatok.lakas

            form.appendChild(table)

            table.appendChild(tr);
            table.appendChild(tr2);

            tr.appendChild(td)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
            tr.appendChild(td6)
            tr.appendChild(td7)

            tr2.appendChild(td8)
            tr2.appendChild(td9)
            tr2.appendChild(td10)
            tr2.appendChild(td11)
            tr2.appendChild(td12)
            tr2.appendChild(td13)
            tr2.appendChild(td14)

        }catch(error){
            console.error("GET hiba!");
        }
    }
})