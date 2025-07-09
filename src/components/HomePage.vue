<template>
  <div v-if="isAuthenticated" @click="checkClose($event)">
    <div class="welcome-header">
      <div class="mascot-container">
        <div class="mascot">
          <div class="mascot-face">
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
            <div class="smile"></div>
          </div>
        </div>
      </div>
      <h1>Olá, {{ getUsername }}! 👋</h1>
      <p class="welcome-message">Que bom ter você de volta! Estou aqui para apoiar sua jornada de autoconhecimento.</p>
    </div>
    <Chat ref="chat" />
  </div>
  
  <div v-else class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="mascot-container">
          <img src="/img/ana-wink.png" alt="Ana Avatar" class="mascot" />
          <div class="speech-bubble">
            <p>Olá! Eu sou a Ana 😊</p>
          </div>
        </div>
        
        <div class="hero-text">
          <h1>Ana's Mindspace</h1>
          <p class="subtitle">Seu espaço de apoio para bem-estar mental</p>
          <p class="description">
            Uma assistente virtual especializada em Terapia Cognitivo-Comportamental,
            pronta para ajudar você a compreender a conexão entre seus pensamentos,
            emoções e comportamentos.
          </p>
          
          <div class="cta-buttons">
            <router-link class="btn btn-primary" :to="{ name: 'register' }">
              Começar Agora
            </router-link>
            <router-link class="btn btn-secondary" :to="{ name: 'login' }">
              Fazer Login
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Como a Ana pode te ajudar?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🧠</div>
            <h3>Autoconhecimento</h3>
            <p>Explore seus pensamentos automáticos e descubra padrões cognitivos que influenciam seu bem-estar.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💭</div>
            <h3>Gestão de Pensamentos</h3>
            <p>Aprenda a identificar e questionar pensamentos que podem estar causando desconforto emocional.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌱</div>
            <h3>Crescimento Pessoal</h3>
            <p>Desenvolva habilidades práticas baseadas na TCC para lidar melhor com desafios do dia a dia.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🤝</div>
            <h3>Suporte Inicial</h3>
            <p>Receba orientações sobre como buscar ajuda profissional quando necessário.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Ana Section -->
    <section class="about-ana">
      <div class="container">
        <div class="about-content">
          <div class="ana-avatar">
            <div class="mascot large">
              <div class="mascot-face">
                <div class="eyes">
                  <div class="eye left"></div>
                  <div class="eye right"></div>
                </div>
                <div class="smile"></div>
              </div>
            </div>
          </div>
          
          <div class="about-text">
            <h2>Conheça a Ana</h2>
            <p>
              Sou uma assistente virtual baseada nos princípios da Terapia Cognitivo-Comportamental (TCC).
              Meu objetivo é criar um espaço acolhedor e seguro onde você possa explorar a conexão entre
              seus pensamentos, emoções e comportamentos.
            </p>
            <p>
              <strong>⚠️ Importante:</strong> Sou uma ferramenta de suporte educativo, não uma substituta para
              terapia profissional. Estou aqui para ser seu primeiro passo na jornada de autoconhecimento
              e para orientar você na busca por um profissional especializado.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2>Como Funciona</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Situação/Evento</h3>
            <p>Identificamos a situação que está causando desconforto</p>
          </div>
          
          <div class="step-arrow">→</div>
          
          <div class="step">
            <div class="step-number">2</div>
            <h3>Pensamentos Automáticos</h3>
            <p>Exploramos: "O que estava passando pela sua cabeça?"</p>
          </div>
          
          <div class="step-arrow">→</div>
          
          <div class="step">
            <div class="step-number">3</div>
            <h3>Reações</h3>
            <p>Observamos as reações emocionais, comportamentais e físicas</p>
          </div>
        </div>
        
        <div class="methodology-note">
          <p>
            <em>Baseado no modelo cognitivo da TCC: não é a situação em si que determina como você se sente,
            mas como você interpreta essa situação.</em>
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="final-cta">
      <div class="container">
        <div class="cta-content">
          <div class="mascot-container">
            <div class="mascot">
              <div class="mascot-face">
                <div class="eyes">
                  <div class="eye left"></div>
                  <div class="eye right"></div>
                </div>
                <div class="smile"></div>
              </div>
            </div>
            <div class="speech-bubble">
              <p>Vamos explorar juntos? 🌟</p>
            </div>
          </div>
          
          <h2>Pronto para começar sua jornada de autoconhecimento?</h2>
          <p>Crie sua conta gratuita e comece a conversar com a Ana agora mesmo!</p>
          
          <div class="cta-buttons">
            <router-link class="btn btn-primary large" :to="{ name: 'register' }">
              Criar Conta Gratuita
            </router-link>
          </div>
          
          <p class="disclaimer">
            <small>
              A Ana é uma ferramenta de apoio educativo baseada em TCC, e não substitui acompanhamento
              profissional. Em casos de emergência, procure ajuda imediatamente.
            </small>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Chat from './chat/ChatComponent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  components: {
    Chat
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'user']),
    getUsername() {
      return this.isAuthenticated ? this.user.username : ''
    }
  },
  methods: {
    checkClose(event) {
      if (!event.target.closest('.chat-sidebar')) {
        this.$refs.chat.checkClose(event)
      }
    }
  }
}
</script>

<style scoped>
/* Landing Page Styles */
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
}

/* Hero Section */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  border-radius: 16px;
}

.hero-text {
  padding: 1rem;
  border-radius: 16px;
}

.hero-text h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
}

/* Ana Mascot */
.mascot-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.mascot {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.speech-bubble {
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  color: #333;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  animation: bounce 2s ease-in-out infinite;
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
}

.speech-bubble p {
  background: transparent;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0px); }
  50% { transform: translateX(-50%) translateY(-5px); }
}

/* Buttons */
.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
}

.btn-primary {
  background: #4fa3d1;
  color: white;
  box-shadow: 0 4px 15px rgba(79, 163, 209, 0.4);
}

.btn-primary:hover {
  background: #356b9a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 163, 209, 0.6);
}

.btn-secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.btn.large {
  padding: 1.2rem 3rem;
  font-size: 1.3rem;
}

/* Sections */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 16px;
}

.features {
  padding: 5rem 2rem;
  background: white;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: transparent;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  background: #d9cff5;
  border-radius: 16px;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  background: transparent;
}

/* About Ana Section */
.about-ana {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: #555;
}

/* How it Works Section */
.how-it-works {
  padding: 5rem 2rem;
  background: white;
}

.how-it-works h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.steps {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.step {
  text-align: center;
  max-width: 200px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4fa3d1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.step-arrow {
  font-size: 2rem;
  color: #4fa3d1;
  font-weight: bold;
}

.methodology-note {
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  color: #666;
}

.methodology-note p, .methodology-note em {
  background: transparent;
}

/* Final CTA Section */
.final-cta {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-content {
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.disclaimer {
  margin-top: 2rem;
  opacity: 0.7;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Welcome Header (for authenticated users) */
.welcome-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.welcome-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.welcome-message {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .hero-text h1 {
    font-size: 2.5rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .steps {
    flex-direction: column;
    gap: 1rem;
  }
  
  .step-arrow {
    transform: rotate(90deg);
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media screen and (max-width: 480px) {
  .hero {
    padding: 1rem;
  }
  
  .hero-text h1 {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .mascot {
    width: 120px;
    height: 120px;
  }
  
  .mascot.large {
    width: 150px;
    height: 150px;
  }
}
</style>
