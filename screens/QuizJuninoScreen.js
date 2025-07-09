import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window'); // Pega as dimensões da tela

const quizQuestions = [
  {
    question: 'Qual o nome da dança típica da Festa Junina?',
    options: ['Samba', 'Quadrilha', 'Forró', 'Frevo'],
    answer: 'Quadrilha',
  },
  {
    question: 'Qual doce típico é feito de amendoim?',
    options: ['Pé de Moleque', 'Canjica', 'Pamonha', 'Maçã do Amor'],
    answer: 'Pé de Moleque',
  },
  {
    question: 'Em que mês geralmente acontece a Festa Junina?',
    options: ['Maio', 'Julho', 'Junho', 'Agosto'],
    answer: 'Junho',
  },
  {
    question: 'Qual desses itens não é comum em uma fogueira de Festa Junina?',
    options: ['Milho', 'Madeira', 'Fósforo', 'Água'],
    answer: 'Água',
  },
  {
    question: 'Qual o nome do santo padroeiro das festas juninas?',
    options: ['São Pedro', 'São João', 'Santo Antônio', 'Todos os anteriores'],
    answer: 'Todos os anteriores',
  },
];

export default function QuizJuninoScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAnswer = (selected) => {
    setSelectedOption(selected);
    if (selected === quizQuestions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Text style={styles.title}>🎉 Quiz Junino Finalizado! 🎉</Text>
        <Text style={styles.scoreText}>Sua pontuação: {score} de {quizQuestions.length}</Text>
        <Text style={styles.subtitle}>
          {score === quizQuestions.length
            ? 'Arrasou! Você é um verdadeiro caipira! 🤠'
            : score >= quizQuestions.length / 2
            ? 'Muito bem! Quase lá! 😊'
            : 'Continue tentando para se tornar um expert junino! 🤔'}
        </Text>
        <TouchableOpacity style={styles.button} onPress={resetQuiz}>
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>🤔 Quiz Junino 🤔</Text>
      <Text style={styles.questionNumber}>Pergunta {currentQuestionIndex + 1}/{quizQuestions.length}</Text>
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && (option === currentQuestion.answer ? styles.correctOption : styles.incorrectOption),
              selectedOption !== null && option === currentQuestion.answer && styles.correctOption
            ]}
            onPress={() => handleAnswer(option)}
            disabled={selectedOption !== null}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD700', // Fundo amarelo claro/dourado
    alignItems: 'center',
    justifyContent: 'flex-start', // Começa do topo para permitir scroll
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#8B4513', // Marrom escuro
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#A0522D', // Marrom médio
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: width * 0.04,
    color: '#A0522D',
    marginBottom: 15,
  },
  questionCard: {
    backgroundColor: '#F5DEB3',
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#D2B48C',
  },
  questionText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#FFFAF0', // Branco sujo
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 8,
    width: '90%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  optionText: {
    fontSize: width * 0.045,
    color: '#A0522D',
    fontWeight: '500',
  },
  correctOption: {
    backgroundColor: '#90EE90', // Verde claro
    borderColor: '#3CB371', // Verde médio
  },
  incorrectOption: {
    backgroundColor: '#FFB6C1', // Rosa claro
    borderColor: '#DC143C', // Vermelho forte
  },
  button: {
    backgroundColor: '#8B4513', // Marrom escuro
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#A0522D', // Borda mais clara
  },
  buttonText: {
    color: '#FFD700', // Dourado
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});
