import React, { useState, useEffect, useRef } from "react";
import {
  PageContainer,
  DogList,
  DogItem,
  DogForm,
  Input,
  Button,
  RemoveButton,
  Buttons,
  TabButton,
  ShelterForm,
} from "./HomeStyle";
import dogs from "../dogsData";

export default function Home() {
  //useRef kvuli Id

  const dogsCount = useRef(dogs.length);

  //Vytazeni dat z dogsData.js a preulozeni do listOfDogs

  const [listOfDogs, setListOfDogs] = useState(dogs);

  //Defaultni nastaveni newDoga

  const [newDog, setNewDog] = useState({
    // id:
    //   listOfDogs.length > 0
    //     ? Math.max(...listOfDogs.map((dog) => dog.id)) + 1
    //     : 1,
    id: dogsCount.current + 1,
    name: "",
    race: "",
    age: "",
  });

  //F-ce validateData vraci true/false-kontroluje data v inputu

  const [valid, setValid] = useState(false);

  const validateData = (dog) => {
    if (dog.age === "" || parseInt(dog.age) < 0 || parseInt(dog.age) > 24) {
      return setValid(false);
    } else if (dog.name.trim().length === 0) {
      return setValid(false);
    } else if (dog.race.trim().length === 0) {
      return setValid(false);
    } else {
      return setValid(true);
    }
  };

  //Zmena pozadi prepinaciho buttonu pres atributy TabButtonu(data-active,name) v HomeStyle podminka pro prepinani

  const [activeTab, setActiveTab] = useState("list-of-dogs");

  // sklad utulku defaultni zasoby

  const [shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });

  // pridani z inputu zasob do docasne konst.

  const [tempStorage, setTempStorage] = useState({
    food: "",
    vaccine: "",
    pills: "",
  });

  // nahrani zasob z inputu do promene

  const handleStorage = (event) => {
    const updateItem = {
      ...tempStorage,
      [event.target.name]: event.target.value,
    };
    setTempStorage(updateItem);
  };

  //F-ce pro pridani hodnot z inputu do vypisu zasob

  const updateStorage = () => {
    const storageValue = tempStorage;
    let newStorageValue = {};
    const keys = Object.keys(storageValue);
    keys.map((key) => {
      if (parseInt(storageValue[key])) {
        return (newStorageValue[key] =
          parseInt(shelterStorage[key]) + parseInt(storageValue[key]));
      } else {
        return (newStorageValue[key] = parseInt(shelterStorage[key]));
      }
    });
    setShelterStorage(newStorageValue);
    setTempStorage({
      food: "",
      vaccine: "",
      pills: "",
    });
  };

  // Potreby pro jednoho psa

  const dogsRequirements = {
    food: 5,
    vaccine: 1,
    pills: 2,
  };

  //F-ce handleChange prida text z inputu do newDog

  const handleChange = (event) => {
    const updateDog = { ...newDog, [event.target.name]: event.target.value };
    setNewDog(updateDog);
    validateData(updateDog);
  };

  //UseEffect kterym se divame na zmeny

  useEffect(() => {
    console.log(listOfDogs);
  }, [listOfDogs]);

  //F-ce handleAdd prida noveho psa do listu a smaze inputy

  const handleAdd = () => {
    // vynasobime potreby pro psa s poctem psu v utulku

    let pushDog = false;
    const totalRequirement = {
      food: dogsRequirements.food * (listOfDogs.length + 1),
      vaccine: dogsRequirements.vaccine * (listOfDogs.length + 1),
      pills: dogsRequirements.pills * (listOfDogs.length + 1),
    };

    //podminka ktera zkouma jestli mame dostatek zasob pro pridani noveho psa

    if (
      totalRequirement.food <= shelterStorage.food &&
      totalRequirement.vaccine <= shelterStorage.vaccine &&
      totalRequirement.pills <= shelterStorage.pills
    ) {
      pushDog = true;
    } else {
      alert("Nedostatek zasob pro pridani psa!");
    }

    //Pokud mame provede se pridani noveho psa

    if (pushDog) {
      setListOfDogs((listOfDogs) => {
        return [...listOfDogs, newDog];
      });
      // const newId = newDog.id + 1;
      dogsCount.current++;
      const updateDog = {
        id: dogsCount.current + 1,
        name: "",
        race: "",
        age: "",
      };
      setNewDog(updateDog);
      setValid(false);
      setListOfDogsBackUp(listOfDogs);
    }
  };

  //F-ce na odebrani psa z listOfDogs

  const handleRemove = (dogToRemove) => {
    const newListOfDogs = listOfDogs.filter((dog) => {
      return dog.id !== dogToRemove;
    });
    setListOfDogs(newListOfDogs);
  };

  //Vymazat vse

  const handleRemoveAll = () => {
    setListOfDogsBackUp(listOfDogs)
    setListOfDogs([]);
  };
  const [listOfDogsBackUp,setListOfDogsBackUp]=useState(listOfDogs)
  const handleBack=()=>{
    setListOfDogs(listOfDogsBackUp)
  }
  return (
    <PageContainer>
      <Buttons>
        <TabButton
          name="list-of-dogs"
          data-active={activeTab}
          onClick={() => setActiveTab("list-of-dogs")}
        >
          Seznam psu
        </TabButton>
        <TabButton
          name="shelter-storage"
          data-active={activeTab}
          onClick={() => setActiveTab("shelter-storage")}
        >
          Sklad utulku
        </TabButton>
      </Buttons>
      {activeTab === "list-of-dogs" && (
        <>
          <DogList>
            {listOfDogs.map((dog) => {
              return (
                <DogItem key={dog.id}>
                  {dog.name} / {dog.race} / {dog.age}
                  <RemoveButton onClick={() => handleRemove(dog.id)}>
                    x
                  </RemoveButton>
                </DogItem>
              );
            })}
          </DogList>
          <DogForm>
            <Input
              type="text"
              placeholder="jmeno psa"
              name="name"
              value={newDog.name}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="rasa psa"
              name="race"
              value={newDog.race}
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="vek psa"
              name="age"
              min={0}
              max={24}
              value={newDog.age}
              onChange={handleChange}
            />
            <Button onClick={handleAdd} disabled={!valid}>
              Pridat
            </Button>
          </DogForm>
          <Button onClick={handleRemoveAll}>Vymazat vse</Button>
          <Button style={{marginTop:20+'px'}} onClick={handleBack}>Vratit zpet</Button>
        </>
      )}
      {activeTab === "shelter-storage" && (
        <>
          <h3>Aktualni zasoby</h3>
          <p>Granule: {shelterStorage.food} kg</p>
          <p>Vakciny: {shelterStorage.vaccine} ks</p>
          <p>Medikamenty: {shelterStorage.pills} ks</p>
          <ShelterForm>
            <Input
              type="number"
              min="0"
              placeholder="granule (kg)"
              name="food"
              value={tempStorage.food}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="vakciny (ks)"
              name="vaccine"
              value={tempStorage.vaccine}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="leky (ks)"
              name="pills"
              value={tempStorage.pills}
              onChange={handleStorage}
            />
            <Button style={{ marginTop: 20 + "px" }} onClick={updateStorage}>
              Doplnit zasoby
            </Button>
          </ShelterForm>
        </>
      )}
    </PageContainer>
  );
}
