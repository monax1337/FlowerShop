import React, {useContext, useEffect, useState} from "react";
import FlowerList from "../Componets/FlowerList";
import MyButton from "../Componets/UI/buttons/MyButton";
import FlowerFormAdd from "../Componets/FlowerFormAdd";
import MyModal from "../Componets/UI/modals/MyModal";
import {useFlowers} from "../hooks/useFlowers";
import FlowerFilter from "../Componets/FlowerFilter";
import FlowerService from "../API/FlowerService";
import FlowerFormChange from "../Componets/FlowerFormChange";
import {useIntl} from "react-intl";
import {LocaleContext} from "../Contexts";
import BouquetFormAdd from "../Componets/BouquetFormAdd";
import BouquetList from "../Componets/BouquetList";
import BouquetFormChange from "../Componets/BouquetFormChange";

const Admin = () => {
    const intl = useIntl();
    const [flowers, setFlowers] = useState([]);
    const [bouquets, setBouquets] = useState([]);
    const [modal, setModal] = useState(false);
    const [bouquetModal, setBouquetModal] = useState(false);
    const [changeModal, setChangeModal] = useState(false);
    const [changeBouquetModal, setChangeBouquetModal] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedBouquet, setSelectedBouquet] = useState(null);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const sortedAndSearchedFlowers = useFlowers(flowers, filter.sort, filter.query);
    const {locale, setLocale} = useContext(LocaleContext);

    const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

    const getFlowers = async () => {
        const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
        setFlowers(fetchedFlowers);
    };

    const getBouquets = async () => {
        const fetchedBouquets = await FlowerService.getAllBouquets(selectedLanguage);
        setBouquets(fetchedBouquets);
    };

    useEffect(() => {
        getFlowers();
        getBouquets();
    }, [setFlowers, setBouquets, locale])

    const addFlower = async (newFlowerRu, newFlowerEn) => {
        await FlowerService.addFlowerToService(newFlowerEn, 'english');
        await FlowerService.addFlowerToService(newFlowerRu, 'russian');
        setFlowers(locale === 'ru' ? ([...flowers, newFlowerRu]) : ([...flowers, newFlowerEn]));
    };

    const addBouquet = async (newBouquetRu, newBouquetEn) => {
        await FlowerService.addBouquetToService(newBouquetEn, 'english');
        await FlowerService.addBouquetToService(newBouquetRu, 'russian');
        setBouquets(locale === 'ru' ? ([...bouquets, newBouquetRu]) : ([...bouquets, newBouquetEn]));
    };

    const removeFlower = async (flower) => {
        const updatedFlowers = flowers.filter(f => f.id !== flower.id);
        await FlowerService.removeFlowers(flower.id, 'english');
        await FlowerService.removeFlowers(flower.id, 'russian');
        setFlowers(updatedFlowers);
    };

    const removeBouquet = async (bouquet) => {
        const updatedBouquets = bouquets.filter(f => f.id !== bouquet.id);
        await FlowerService.removeBouquets(bouquet.id, 'english');
        await FlowerService.removeBouquets(bouquet.id, 'russian');
        setBouquets(updatedBouquets);
    };

    const changeFlower = async (changedFlowerRu, changedFlowerEn) => {
        const oldFlower = selectedFlower;
        await FlowerService.updateFlower(oldFlower, changedFlowerEn, 'english');
        await FlowerService.updateFlower(oldFlower, changedFlowerRu, 'russian');
        const updatedFlowers = flowers.map(flower => {
            if (flower.id === oldFlower.id) {
                return locale === 'ru' ? changedFlowerRu : changedFlowerEn;
            }
            return flower;
        });
        setFlowers(updatedFlowers);
        setChangeModal(false);
    };

    const changeBouquet = async (changedBouquetRu, changedBouquetEn) => {
        const oldBouquet = selectedBouquet;
        await FlowerService.updateBouquet(oldBouquet, changedBouquetEn, 'english');
        await FlowerService.updateBouquet(oldBouquet, changedBouquetRu, 'russian');
        const updatedBouquets = bouquets.map(bouquet => {
            if (bouquet.id === oldBouquet.id) {
                return locale === 'ru' ? changedBouquetRu : changedBouquetEn;
            }
            return bouquet;
        });
        setBouquets(updatedBouquets);
        setChangeBouquetModal(false);
    };

    const handleFlowerSelection = (flower) => {
        setSelectedFlower(flower);
        setChangeModal(true);
    };

    const handleBouquetSelection = (bouquet) => {
        setSelectedBouquet(bouquet);
        setChangeBouquetModal(true);
    };

    return (
        <div className="App">
            <MyButton style={{marginTop: "10px"}} onClick={() => setModal(true)}>
                {intl.formatMessage({id: 'addFlowerButton'})}
            </MyButton>
            <MyButton style={{margin: "10px 0 0 10px"}} onClick={() => setBouquetModal(true)}>
                {intl.formatMessage({id: 'addBouquetButton'})}
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <FlowerFormAdd add={addFlower}/>
            </MyModal>
            <MyModal visible={bouquetModal} setVisible={setBouquetModal}>
                <BouquetFormAdd add={addBouquet}/>
            </MyModal>
            <MyModal visible={changeModal} setVisible={setChangeModal}>
                <FlowerFormChange flower={selectedFlower} change={changeFlower}/>
            </MyModal>
            <MyModal visible={changeBouquetModal} setVisible={setChangeBouquetModal}>
                <BouquetFormChange bouquet={selectedBouquet} change={changeBouquet}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <BouquetList
                bouquets={bouquets}
                changeBouquet={changeBouquet}
                removeBouquetFromList={removeBouquet}
                handleBouquetSelection={handleBouquetSelection}
                title={intl.formatMessage({id: 'panelTitleBouquet'})}
            />
            <FlowerFilter filter={filter} setFilter={setFilter}/>
            <FlowerList
                flowers={sortedAndSearchedFlowers}
                changeFlower={changeFlower}
                removeFlowerFromList={removeFlower}
                handleFlowerSelection={handleFlowerSelection}
                title={intl.formatMessage({id: 'panelTitle'})}
            />
        </div>
    )
};

export default Admin;
