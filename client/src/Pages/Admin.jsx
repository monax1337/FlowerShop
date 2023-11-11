import React, { useContext, useEffect, useState } from "react";
import { useFetching } from "../hooks/useFetching";
import MyLoader from "../Componets/UI/loaders/MyLoader";
import FlowerList from "../Componets/FlowerList";
import MyButton from "../Componets/UI/buttons/MyButton";
import FlowerFormAdd from "../Componets/FlowerFormAdd";
import MyModal from "../Componets/UI/modals/MyModal";
import { useFlowers } from "../hooks/useFlowers";
import FlowerFilter from "../Componets/FlowerFilter";
import FlowerService from "../API/FlowerService";
import FlowerFormChange from "../Componets/FlowerFormChange";
import { useIntl } from "react-intl";
import { LocaleContext } from "../Contexts";

const Admin = () => {
  const intl = useIntl();
  const [flowers, setFlowers] = useState([]);
  const [modal, setModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const sortedAndSearchedFlowers = useFlowers(flowers, filter.sort, filter.query);
  const { locale, setLocale } = useContext(LocaleContext);

  const selectedLanguage = locale === 'ru' ? 'russian' : 'english';

  const [fetchFlowers, isFlowersLoading, flowerError] = useFetching(async () => {
  })

  useEffect(() => {
    const getFlowers = async () => {
      const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
      setFlowers(fetchedFlowers);
    };
    getFlowers();
    fetchFlowers();
  }, [setFlowers])

  useEffect(() => {
    const getFlowers = async () => {
      const fetchedFlowers = await FlowerService.getAllFlowers(selectedLanguage);
      setFlowers(fetchedFlowers);
    };
    getFlowers();
  }, [fetchFlowers])

  const addFlower = async (newFlowerRu, newFlowerEn) => {
    setFlowers([...flowers, newFlowerRu, newFlowerEn]);
    await FlowerService.addFlowerToService(newFlowerEn, 'english');
    await FlowerService.addFlowerToService(newFlowerRu, 'russian');
  };

  const removeFlower = async (flower) => {
    const updatedFlowers = flowers.filter(f => f.id !== flower.id);
    setFlowers(updatedFlowers);
    await FlowerService.removeFlowers(flower.id, 'english');
    await FlowerService.removeFlowers(flower.id, 'russian');
  };

  const changeFlower = async (changedFlowerRu, changedFlowerEn) => {
    const oldFlower = selectedFlower;
    await FlowerService.updateFlower(oldFlower, changedFlowerEn, 'english');
    await FlowerService.updateFlower(oldFlower, changedFlowerRu, 'russian');
  };

  const handleFlowerSelection = (flower) => {
    setSelectedFlower(flower);
    setChangeModal(true);
  };

  return (
    <div className="App">
      <MyButton style={{ margin: '10px 0 0 0' }} onClick={() => setModal(true)}>
        {intl.formatMessage({ id: 'addFlowerButton' })}
      </MyButton>
      <MyModal visible={modal} setVisible={setModal} >
        <FlowerFormAdd add={addFlower} />
      </MyModal>
      <MyModal visible={changeModal} setVisible={setChangeModal} >
        <FlowerFormChange flower={selectedFlower} change={changeFlower} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <FlowerFilter filter={filter} setFilter={setFilter} />
      {flowerError &&
        <h2>{intl.formatMessage({ id: 'errorText' })}{flowerError}</h2>
      }
      {isFlowersLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><MyLoader /></div>
      }
      <FlowerList
        flowers={sortedAndSearchedFlowers}
        changeFlower={changeFlower}
        removeFlowerFromList={removeFlower}
        handleFlowerSelection={handleFlowerSelection}
        title={intl.formatMessage({ id: 'panelTitle' })}
      />
    </div>
  )
};

export default Admin;
