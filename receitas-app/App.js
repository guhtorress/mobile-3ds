import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, Modal, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';

export default function App() {
  const [receitas, setReceitas] = useState([
    {
      id: '1',
      nome: '🥞 Panqueca Americana',
      ingredientes: '• 1 xícara de farinha de trigo\n• 2 colheres de sopa de açúcar\n• 2 colheres de chá de fermento em pó\n• 1 pitada de sal\n• 1 ovo batido\n• 1 xícara de leite\n• 2 colheres de sopa de manteiga derretida',
      preparo: '1. Misture os ingredientes secos em uma tigela.\n2. Adicione o ovo, o leite e a manteiga, mexendo até ficar homogêneo.\n3. Aqueça uma frigideira antiaderente e coloque porções da massa.\n4. Vire quando surgirem bolhas e doure o outro lado.'
    }
  ]);

  const [modalVerVisivel, setModalVerVisivel] = useState(false);
  const [modalAddVisivel, setModalAddVisivel] = useState(false);
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const [nome, setNome] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [preparo, setPreparo] = useState('');

  const abrirReceita = (receita) => {
    setReceitaSelecionada(receita);
    setModalVerVisivel(true);
  };

  const limparFormulario = () => {
    setNome('');
    setIngredientes('');
    setPreparo('');
    setModalAddVisivel(false);
  };

  const salvarReceita = () => {
    if (!nome.trim() || !ingredientes.trim() || !preparo.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const novaReceita = {
      id: Math.random().toString(),
      nome,
      ingredientes,
      preparo
    };

    setReceitas([...receitas, novaReceita]);
    Alert.alert('Sucesso', 'Receita cadastrada com sucesso!');
    limparFormulario();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 App de Receitas</Text>
      <Text style={styles.subtitle}>Colecione suas receitas preferidas</Text>

      <ScrollView style={styles.scrollLista} showsVerticalScrollIndicator={false}>
        {receitas.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Button title="Ver Receita" color="#D35400" onPress={() => abrirReceita(item)} />
          </View>
        ))}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVerVisivel} onRequestClose={() => setModalVerVisivel(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {receitaSelecionada && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.modalTitle}>{receitaSelecionada.nome}</Text>
                <Text style={styles.sectionTitle}>Ingredientes:</Text>
                <Text style={styles.modalText}>{receitaSelecionada.ingredientes}</Text>
                <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
                <Text style={styles.modalText}>{receitaSelecionada.preparo}</Text>
              </ScrollView>
            )}
            <View style={{ marginTop: 20 }}>
              <Button title="Fechar Receita" color="#7A2E00" onPress={() => setModalVerVisivel(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modalAddVisivel} onRequestClose={limparFormulario}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>🍳 Nova Receita</Text>
              
              <Text style={styles.label}>Nome da Receita:</Text>
              <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Bolo de Cenoura" />

              <Text style={styles.label}>Ingredientes:</Text>
              <TextInput style={[styles.input, styles.inputMultiline]} value={ingredientes} onChangeText={setIngredientes} placeholder="Ex: 2 ovos..." multiline={true} />

              <Text style={styles.label}>Modo de Preparo:</Text>
              <TextInput style={[styles.input, styles.inputMultiline]} value={preparo} onChangeText={setPreparo} placeholder="Ex: 1. Bata tudo..." multiline={true} />

              <View style={styles.btnRow}>
                <View style={{ flex: 1, marginRight: 8 }}><Button title="Salvar" color="#D35400" onPress={salvarReceita} /></View>
                <View style={{ flex: 1, marginLeft: 8 }}><Button title="Cancelar" color="#7A2E00" onPress={limparFormulario} /></View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.fab} activeOpacity={0.7} onPress={() => setModalAddVisivel(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F2",
    paddingTop: 60,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#D35400",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#5C5046",
    marginBottom: 20,
    textAlign: "center"
  },
  scrollLista: {
    flex: 1,
    width: '100%'
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C5046',
    marginBottom: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D35400",
    marginBottom: 16,
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5C5046",
    marginTop: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3E9DC",
    paddingBottom: 4
  },
  modalText: {
    fontSize: 15,
    color: "#4A3F35",
    lineHeight: 22,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C5046',
    marginTop: 12,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#F3E9DC',
    backgroundColor: '#FFFBF7',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#4A3F35'
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top'
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#D35400",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 28,
  }
});
