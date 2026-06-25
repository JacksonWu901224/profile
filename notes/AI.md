<!-- markdownlint-disable MD033 -->

# AI outline graph

```mermaid
flowchart TD
    subgraph AI ["Artificial Intelligence"]
        direction TB
        subgraph ML ["Machine Learning"]
            direction TB
            subgraph NN ["Neural Networks"]
                direction TB
                subgraph DL ["Deep Learning (Multiple Layers)"]
                    direction TB

                    %% NLP Path
                    subgraph NLP_Domain ["Natural Language Processing (NLP)"]
                        subgraph RNN_Sub ["Recurrent Models"]
                            RNN["RNN"] --引入Gating Unit--> LSTM["LSTM"]
                        end
                        subgraph AB[Attention-Based]
                          TF["Transformer"]
                        end
                    end

                    %% CV Path
                    subgraph CV_Domain ["Computer Vision (CV)"]
                        CNN["CNN (Convolutional)"]
                    end

                    subgraph GenAI ["Generative AI"]
                        direction TB
                        LLM(("Large Language Models"))
                        GAN["GAN (Generative Adversarial Network)"]
                        DM["Diffusion Models"]
                    end
                    
                    %% Connections
                    RNN_Sub -.拋棄了遞歸架構，改用注意力機制.-> TF
                    TF --基礎架構--> LLM
                    TF -.DiT (Diffusion Transformer).-> DM
                    CNN --Spatial Representation Architecture--> GAN
                    CNN -.U-Net Backbone,特徵提取與重建.-> DM
                    AE["Autoencoder"] -.Latent Space Compression,壓縮至潛在空間.-> DM
                end
            end
        end
    end

    %% 註解說明
    Note["註:本圖側重於深度學習演進路徑"]
    Note --- AI

    %% Styles
    style AI fill:#4a90e2,stroke:#003366,color:#fff
    style ML fill:#8db5f8,stroke:#005ce6
    style NN fill:#b3d1ff,stroke:#005ce6
    style DL fill:#dae8fc,stroke:#005ce6
    style GenAI fill:#f5faff,stroke:#005ce6
    style NLP_Domain fill:#e1f5fe,stroke:#01579b,stroke-dasharray: 5 5
    style CV_Domain fill:#f3e5f5,stroke:#4a148c,stroke-dasharray: 5 5
```

---

# AI model history timeline

![ai model history](model_history_timeline.svg)

---

# Definition: Generative AI

## 讓computer學會產生<u>複雜</u>而<u>有結構</u>的物件, 就是<font color="blue">Classification</font>, 因為Generative AI就是給一個未完成的句子, 去猜接下來接哪一個token

- 複雜 : 無限可能
- 有結構 : 由有限的<u>基本單位</u>(toekn)所構成
- 基本單位(token) : 
  - 影像 : 是由<font color="blue">像素</font>構成的. 每個像素又由RGB三個子像素組成,而每個子像素的可能值範圍為0-255. 影像只考慮兩個維度: width, height
  - 聲音訊號 : 是由<font color="blue">取樣點</font>構成的. 遠看是聲音訊號,拉進後則可以看到一個一個的取樣點.一秒鐘有多少取樣點,取決於取樣率(sampling rate);比如, 16kHz的取樣率意味著一秒鐘有16000個取樣點. 而每個取樣點有多少種可能的數值,則取決於取樣解析度(bit resolution);常見的16-bit解析度有65,536種可能的數值
  - 影片 : 就是<font color="blue">一連串的圖片</font>, 每一張圖片又叫<font color="blue">Frame</font>. 需考慮三個維度: width, height, time

## Chinchilla Scaling-Laws

<a href="https://arxiv.org/pdf/2001.08361" title="Scaling Laws">Scaling Laws</a>:

- **核心思想**: 在固定訓練算力（Compute Budget）下，模型越大越好（優先增加參數量 $N$）。
- **盲點**: 導致早期模型（如 GPT-3 175B）訓練資料量（Tokens）相對不足，模型處於「未充分訓練（Under-trained）」狀態。

<a href="https://arxiv.org/pdf/2203.15556" title="Chinchilla Scaling Laws">Chinchilla Scaling Laws</a>:

- **核心思想**: 在固定訓練算力下，最佳策略是讓模型參數（$N$,Parameters）與訓練資料（$D$,Training Tokens）同步成長。
- **最佳比例**:$$D \approx 20N$$
- **行動方針**: Train Smaller Models Longer
- **現代延伸**: 現代模型（如 Llama 3）為了最佳化推理成本，通常採用「過度訓練（Over-training）」策略，將比例調至 $D \approx 50N \sim  200N+$, 具體取值因模型設計目標（延遲 vs 成本 vs 準確度）而異。

<a href="https://arxiv.org/pdf/2408.03314">Test-Time Scaling</a>:

- **核心公式**:$$Performance = f(\text{Pre-training Compute}, \text{Post-training Compute}, \text{Test-Time Compute})$$
- **核心思想**: 當預訓練算力與資料接近瓶頸，將算力向「推理期（Test-Time）」傾斜，讓模型在輸出前進行「自我反思與模擬」。
- **Test-Time Compute 實現路徑**:
  - **生成/搜索（Search）**: 思考鏈（CoT）、蒙地卡羅樹搜尋（MCTS）。
  - **驗證/修正（Verify）**: 內省（Self-Correction）、多路採樣投票（Majority Voting）。
- **代表模型**: OpenAI o1 / o3、DeepSeek-R1。

---

# Retrieval Augmented Generation(RAG)

---

# Context Engineering的核心目標

- 避免塞爆Context(把需要的放進去,不需要的清出來)

- 常用招數
  - Select
    - 挑選需要的內容, e.g. RAG, Tool RAG, Memory RAG
  - Compress
  - Multi-Agent

---

# Machine Learning

| Stage | Learning Type | Purpose | Data Source & Scale | Limitations | Key References | Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Pre-training** | Self-Supervised Learning | 學習語言結構、世界知識、常識與基礎代碼邏輯（學會「文字接龍」）。 | 海量網頁、圖書、學術論文、代碼庫。<br>**(10T–100T+ Tokens)** | 偏見與幻覺根源於此階段的訓練數據；後續階段只能緩解，無法根除。 | GPT-3、LLaMA | **Base Model**<br>➔ 知識淵博但無法正常對話，只會盲目預測下一個字。 |
| **Instruction Tuning / SFT** | Supervised Fine-Tuning | 轉變交互模式，讓模型理解「提示詞→回答」的結構，學會聽懂人話並執行指令。 | 人工撰寫或高質量 AI 生成的「高質量問答對 (Q&A Pairs)」。<br>**(數萬至數百萬條 Prompt-Response)** | Pre-training 帶入的偏見與幻覺並未被修正，只是「未被放大」；語氣可能仍粗糙。 | InstructGPT (Ouyang et al., 2022) | **SFT / Instruct Model**<br>➔ 成為合格的答題機器，能理解並執行指令，但仍缺乏價值觀對齊與推理深度。 |
| **Alignment** | RLHF / RLAIF | 賦予模型價值觀：優化說話語氣 (Vibe)、建立安全防線（拒絕有害請求）、減少幻覺。RLAIF 以強大 AI 代替人類打分，已成主流替代方案。 | 人類或強大 AI（RLAIF）對多個回答進行的偏好排序 (Preferences)。<br>**(數十萬條偏好數據)** | 過度 RLHF 可能導致模型過於保守或討好用戶（Sycophancy）。 | InstructGPT、Claude (Constitutional AI) | **Aligned Model**<br>➔ 安全、友善、有立場的 AI 助理，但複雜推理深度仍受限。 |
| **Reasoning Training** | Pure RL / Process Reward Model | 引入思維鏈 (CoT) 與自我糾錯能力，讓模型「先想後答」，大幅提升數學、代碼等複雜任務表現。此階段通常與 Alignment 分開進行。 | 針對數學/代碼等客觀正確答案的獎勵機制；以自動化驗證器提供獎勵信號。<br>**(自動化獎勵環境，無上限)** | 推理成本高（長 CoT）；在無驗證器的開放性問題上可能過度自信。 | o1、o3、DeepSeek-R1 (GRPO) | **Reasoning Model**<br>➔ 我們最終在 ChatGPT、Claude、DeepSeek 上使用的安全、好用、會思考的 AI 助理。 |

![mlthreephases](mlthreephases.png)

- <font color="green">Pretrained Models</font>
  - NLP
    - Encoder(分類、理解)
      - BERT / RoBERTa / ALBERT / ELECTRA
    - Decoder(生成、對話)
      - GPT / LLaMA / OPT
    - Seq2Seq(翻譯、摘要)
      - T5/ BART
  - Computer Vision
    - Backbone(特徵提取，給下游用)
      - CNN：ResNet(CNN+Residual) / VGG / EfficientNet / Inception / ConvNeXt
      - Transformer：ViT / Swin Transformer / DINOv2
    - Object Detection(框出物件)
      - One-stage（快）：YOLO
      - Two-stage（準）：Faster R-CNN
      - Transformer：DETR / RT-DETR 
    - Instance Segmentation(精確輪廓)
      - Mask R-CNN/ YOLO-Seg / SAM

## 0. ML三步驟
![mlthreesteps](mlthreesteps.png)
## 1. prepare data

- split data into  
  i. **training data** &ensp;&emsp;&emsp; 98%  
  ii. **validation data** &emsp;&emsp; 1%  
  iii. **public test data** &emsp;0.5%  
  iv. **private test data**&emsp;0.5%

![data spliting](dataspliting.png)

- **Data Scarcity / Insufficient sample size**(data不夠)
  - **Data Augmentation**
    - **Image Data Augmentation**
      - **幾何變換**:
        - **翻轉 (Flipping)**:水平或垂直翻轉圖片。
        - **旋轉 (Rotation)**:將圖片隨機旋轉特定角度（如 ± 15°）。
        - **縮放 (Scaling) 與裁切 (Cropping)**:放大、縮小或隨機裁切圖片中的物件，強迫模型學習不同尺寸的特徵。
        - **平移 (Translation)**:將圖片沿著水平或垂直方向移動。
      - **色彩與像素變換**:
        - **顏色調整**:隨機改變亮度、對比度、飽和度或色調。
        - **雜訊注入**:加入高斯雜訊 (Gaussian Noise) 或椒鹽雜訊，模擬惡劣拍攝環境。
      - **影像混合 (Image Mixing)**:
        - **Mixup**:將兩張不同的圖片按隨機比例（λ）疊加混合。
        - **CutMix**:將一張圖片的一部分區域挖除，並用另一張圖片的內容填補。
    - **NLP Data Augmentation**
      - **詞彙替換**:使用同義詞詞庫（如 WordNet）將單字替換為同義詞。
      - **詞彙操作**:隨機對句子中的單字進行插入 (Insertion)、刪除 (Deletion) 或交換 (Swap)。
      - **遮罩語言模型 (Masked Language Model)**:利用像 BERT 等預訓練模型，將句中部分單字遮蔽 (Mask) 並讓模型自動預測填補，生成語意相同但寫法不同的新句子。
      - **回譯 (Back-Translation)**:將句子翻譯成另一種語言（例如中文翻成英文），再翻譯回原始語言，以獲得句型變化的資料。
    - **Audio Data Augmentation**
      - **時間平移 (Time Shifting)**:將音訊訊號往前或往後移動。
      - **時間拉伸 (Time Stretching)**:改變音訊的播放速度（加速或減速）而不改變音調。
      - **音調調整 (Pitch Shifting)**:改變音訊的音調高低。
      - **背景雜訊加入**:在語音中混入環境音（如咖啡廳噪音、街道聲），使模型適應真實環境。

## 2. set a model

- 根據domain knowledge
  - <font color="green">Simple Linear Regression</font>
    - $y = \beta_0 + \beta_1x + \epsilon$
      - 其中 $\beta_0$ 為截距，$\beta_1$ 為斜率，$\epsilon$ 為隨機誤差。
      - **$y, x$** is <font color="blue">feature</font>.**$\beta1$** is <font color="blue">weight</font>.**$\beta0$** is <font color="blue">bias</font>
      - **$\text{Parameters} = \text{Weights} + \text{Biases}$**
  - <font color="green">Multiple Linear Regression</font>
    - $y = \beta_0 + \beta_1x_1 + \beta_2x_2 + \dots + \beta_nx_n + \epsilon$
  -  <font color="green">Piecewise Linear Curves</font>
![piecewise linear curves](piecewiselinearcurves.png)
  - <font color="green">Classification</font>
    - <font color="green">Binary Classification</font>(Sigmoid=Logistic Function)
      - $P(y=1|x) = \frac{1}{1 + e^{-(\beta_0 + \beta_1x_1 + \dots + \beta_nx_n)}}$
  <br>
  ![sigmoid function](Sigmoid-Activation-Function.png)
    - <font color="green">Multi-class Classification</font>(Softmax)
  ![softmax](softmax.png)
  - <font color="green">Structured Learning</font>
    - **create** something with structure(e.g. image, document)

### compare regression and classification

![compare regression and classification](compare.png)

- $\sigma$ is called **activation function**
  - Regression
    - $\sigma$ is Relu
  - Classification
    - $\sigma$ is sigmoid/softmax
- $\sigma(\mathbf{b} + \mathbf{W}\mathbf{x})$ is a **<font color="blue">neuron</font>**
- $f(\mathbf{x}) = b + \mathbf{c}^T \sigma(\mathbf{b} + \mathbf{W}\mathbf{x})$ is **<font color="blue">1-Hidden Layer Neural Network</font>**

## 3. set Cost function/Loss function

- Mean Squared Error, MSE
  - $MSE = \frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2$
    - $n$ : 訓練資料的總數 (Train Data Size / Batch Size).
    - $y_i$ : 第 $i$ 筆資料的真實標籤 (Ground Truth).
    - $\hat{y}_i$ : 模型對第 $i$ 筆資料的預測值 (Prediction)。
- Mean Absolute Error, MAE
  - $MAE = \frac{1}{n} \sum_{i=1}^{n} \left|(y_i - \hat{y}_i)\right|$
    - $n$ : 訓練資料的總數 (Train Data Size / Batch Size).
    - $y_i$ : 第 $i$ 筆資料的真實標籤 (Ground Truth).
    - $\hat{y}_i$ : 模型對第 $i$ 筆資料的預測值 (Prediction)。
- Cross-Entropy(classification)
  - if $y, \hat{y}$ are both probability distributions
  - $ Cross-Entropy=H(y, \hat{y}) = -\sum_{i=1}^{c} y_i \log(\hat{y}_i)$
    - $c$: The total number of classes or categories.
    - **Minimizing cross-entropy** is equivalent to **maximizing likelihood**
    - $y_i$: The probability of the $i$-th class in the true distribution (often a <font color="blue">one-hot encoded</font> vector where only one $y_i = 1$ and others are $0$).
    - $\hat{y}_i$: The probability of the $i$-th class predicted by the model (usually the output of a <font color="blue">Softmax function</font>($0 \le \hat{y}_i \le 1$ and $\sum \hat{y}_i = 1$.)).

## 4. set optimizer

- <font color="green">Gradient Descent(Vanilla Gradient Descent)</font>
  - $ \theta ^ {t+1} = \theta ^ {t} - \eta \cdot \nabla L(\theta ^ {t})$
    - $\nabla L(\theta ^ {t})$ 代表損失函數 $L$ 在當前參數 $\theta ^ {t}$ 位置的「斜率」或「坡度」
    - $\eta$(Eta) : The Learning Rate
  - 問題 : 只根據當下算出來的$g^t$來決定方向
    - 解法 : Gradient Descent + Optimizer
      - 根據$g^0,g^1,g^2,...,g^t$一起來決定方向(調整learning rate)
        - <font color="green">Adagrad</font>
          - for each dimension i : $\eta=\frac{\eta}{\sigma_i^t}$, $\sigma_i^t=\sqrt{\sum_{i=0}^{t} (g_i^t)^2}$
          - 問題 : 每一個維度權重相同 
        - <font color="green">RMSProp</font>
          - 解決Adagrad : 最近算出來的gradient給比較大的影響
          - use $\alpha$
  - 可以用<font color="green"> Momentum </font>(下滑之物體會有動量繼續前行, 不會直接殺停)來繼續找
  global minimum用以脫離saddle point or local minimum
    - for each dimension i : $ \theta ^ {t+1} = \theta ^ {t} - \eta \cdot \color{purple}{m_i^t}$ , $\space$ $\color{purple}{m_i^t}$ = $\color{blue}{g_i^0}$ + $\color{green}{g_i^1}$ + $\color{orange}{g_i^2}$ +...+ $g^t$
  - <font color="green">Adam : RMSProp + Momentum</font>
![adam](adam.png)
  - 也可以用<font color="green">Learning Rate Scheduling</font>來調整learning rate
![Learning Rate Scheduling](learningratescheduling.png)
    - warp up : 給optimizer探索地形的機會, 因為剛進入一個新地圖, 不知道地圖有什麼, 設定一個大的learning rate, 讓參數亂跑, 可以大概知道地圖長什麼樣
  - Feature Scaling(夷平error surface)
  ![feature scaling](featurescaling.png)
    - accelerate gradient descent
  ![feature scaling](feature_scaling.webp)
    - Normalization
      - Batch Normalization
  ![batch normalization](batchnormalization.png)
        - $\gamma$, $\beta$ are another network parameters, 另外再被learned出來的;因為normalization完後,$\tilde{z}^1,\tilde{z}^2,\tilde{z}^3,...$之平均為0, 可能會對模型產生限制,所以加上$\gamma$, $\beta$
        - $\gamma$ initialize to $[1, 1, \dots, 1]^T$
        - $\beta$ initialize to $[0, 0, \dots, 0]^T$
      - Layer Normalization
    - Standardizatoin

## 5.Train the model

- Initialization
  - <font color="green">Kaiming Initialization</font>
- **<font color="blue">Use gradient descent to train the model, accelerating convergence to the minimum loss and yielding the optimal model(Find the best $\beta_0, \beta_1, \beta_2, \beta_3,...., \epsilon$).</font>** (Basically, we're now [<ins>***tuning hyperparameters***</ins>](common_hyperparameters.html))

- general guide

![general guide](generalguide.png)

## 6. use validation data to evaluate your model

- be aware of <font color="blue">overfitting</font>

## 7. use test data to test/inference your model

- public test data
  - be aware of <font color="blue">overfitting</font>
- private test data

---

# Convolutional Neural Networks, CNN

<img src="cnn-1.png" width="50%">

**channel** : R, G, B

![cnn benefit](cnn-2.png)
不需Fully Connected Network, weight太龐大了, 用**Receptive Field**(多大自己定義可大可小, 不同receptive field can be overlapped), 而每一個neron只關心自己的receptive field發生的事情
<img src="receptivefield.png" width="50%">

鳥嘴可能在任何地方, 所以可以parameters sharing, called **Filter**
<img src="filter.png" width="50%">

<ins>用Filter掃過一張圖片其實就是**convolution**</ins>

## The Whole CNN

![cnn whole picture](cnn-3.png)

**Pooling** :  
e.g. 把奇數rows, columns拿掉, 讓圖變小

<img src="cnn-4.png" width="50%">

**Flatten** :  
把matrix變成column

---

# Self-Attention(取代RNN)

![input is a set of vectors](selfattention-1.png)

e.g. 文字處理, 聲音訊號(取一個範圍called window(通常為25ms), 描述成一個vector called frame, 為了描述一整段聲音訊號, 每次都把window往右移10ms, 取各個window's frame), graph(consider each **node** as a vector)

![tokenize](tokenize.png)
如何把一個詞彙表示成一個向量?
  1. **one-hot encoding**(向量長度跟世界上存在的詞彙數目一樣多), 但無法看出各個詞彙的相關程度
  2. **word embedding**(向量是有語意的資訊)

![output-1](output-1.png)
e.g. POS tagging,...

![output-2](output-2.png)
e.g. sentiment analysis,...

![output-3](output-3.png)
e.g. translation, speech recognition,...

<img src="selfattention-2.png" width="50%">
<img src="selfattention-2-1.png" width="45%">

self-attention會吃一整個sequence的資訊,input幾個vector, output幾個vector; self-attention也可以疊加很多次

<img src="selfattention-2-2.png" width="75%">

self-attention是這樣運作的

<img src="dotproduct.png" width="50%">

現今最常拿來計算self-attention之module就是**Dot-Product**
現今self-attention最常用的是<u>**Dot-Product**</u>, 也用在<u>**Transformer**</u>上

<img src="selfattention-3.png" width="85%">

$a^1$跟$a^2, a^3, a^4$個別算關聯性(attention score)

<img src="selfattention-4.png" width="85%">

實作上, $a^1$也會跟自己算關聯性(attention score), 然後再過一個soft-max(也可用其他的activation function $\sigma$)做normalization

<img src="selfattention-5.png" width="85%">

接下來, 根據$\alpha^\prime$去抽取出這個sequence裡面重要的資訊, 怎麼抽取重要資訊?
會把$a^1, a^2, a^3, a^4$每個vector乘上$W^v$得到$v^1, v^2, v^3, v^4$, 再把$v^1, v^2, v^3, v^4$去乘上已經算出來的attention score$\alpha_{1,1}', \alpha_{1,2}', \alpha_{1,3}', \alpha_{1,4}'$, 再相加
<ins>**所以如果$a^1, a^2$attention score很高($\alpha_{1,2}'很大$), 那weighted sum就很可能比較接近$v^2$**</ins>

<img src="selfattention-6.png" width="85%">

$b^1, b^2, b^3, b^4$是一次同時被計算出來的

<img src="selfattention-7.png" width="85%">

用矩陣乘法角度來看<!-- 橘色方塊 --><span style="background-color: #F4A27E; color: #000000; padding: 4px 8px; font-weight: bold;">qⁱ</span>, <!-- 土黃色方塊 --><span style="background-color: #FAD06C; color: #000000; padding: 4px 8px; font-weight: bold;">kⁱ</span>, <!-- 藍色方塊 --><span style="background-color: #85B7E2; color: #000000; padding: 4px 8px; font-weight: bold;">vⁱ</span>, $W^q,W^k,W^v$是被learned出來的

<img src="selfattention-8.png" width="85%">

用矩陣乘法來看attention score

<img src="selfattention-9.png" width="85%">

用矩陣乘法來看weighted sum

## Fianl Self-Attention
<img src="selfattention-10.png" width="85%">

## 進階版 Self-Attention: Multi-head Self-Attention

可以想成一般self-attention是用$q$去找相關的$k$,而相關這件事情, 有很多種不同的形式, 有很多種不同的定義, 所以也許不能只有一個$q$, 應該要有多個$q$, 不同的$q$負責不同的$k$

<img src="multiheadselfattention-1.png" width="85%">
<img src="multiheadselfattention-2.png" width="85%">

先把$a^i$乘上$W^q$得到$q^i$, 再把$q^i$乘上兩個不同的matrix $W^{q,1}, W^{q,2}$, 分別得到$q^{i,1}, q^{i,2}$; $k, v$也是相同作法
再去算weighted sum

<img src="multiheadselfattention-3.png" width="85%">

再讓$b^{i,1}, b^{i,2}$通過一個transform(matrix $W^o$)得到$b^i$, 再送到下一層去

## Self-Attention 少了位置資訊, 所以可以加上Positional Encoding

<img src="positionalencoding.png" width="45%">

## Self-Attention 不只用在NLP(Transforemr, BERT)上

<img src="selfattentionforspeech.png" width="60%">

Truncated Self-Attention: 不要看一整句話, 看一個小範圍就好

<img src="selfattentionforimage-1.png" width="70%">
<img src="selfattentionforimage-2.png" width="70%">
<img src="selfattentionforimage-3.png" width="70%">

CNN可看作是簡化版self-attention
self-attention可看作是複雜版CNN
<img src="selfattentionforimage-4.png" width="70%">
<img src="selfattentionforimage-5.png" width="70%">
因為CNN是self-attention之subset, 所以資料量小時self-attention容易overfitting

<img src="selfattentionvsrnn.png" width="70%">

### RNN(Recurrent Neural Network) 與 Self-Attention 的差異

1. **RNN 的資訊傳遞方式**
   - 在一般 RNN 中，當前時間步只能直接利用前面時間步累積下來的 hidden state，因此本質上是依序從左到右處理。
   - 若要取得很久以前的資訊，必須透過一連串 hidden state 傳遞，容易發生 long-term dependency 問題。

2. **Bi-RNN(（Bidirectional Recurrent Neural Network)**
   - 雖然同時考慮左側與右側資訊，但遠距離資訊仍需透過多個時間步傳遞。
   - 例如最右邊的黃色 vector 想利用最左邊的藍色 vector，其資訊仍需經過許多 hidden state 才能傳到目標位置。
   - 因此長距離依賴仍然較難學習。

3. **Self-Attention**
   - 每個 token 都可以直接與所有 token 計算 attention score。
   - 最右邊的黃色 vector 若想參考最左邊的藍色 vector，只需透過 Query-Key 相似度即可直接建立連結。
   - 不需要經過中間多層 hidden state 的資訊傳遞，因此更容易捕捉長距離依賴。

4. **最大的差別：可否平行化（Parallelization）**
   - RNN 的計算依賴前一個時間步的 hidden state，因此必須依序計算：
     \[
     h_t = f(h_{t-1}, x_t)
     \]
   - Self-Attention 中，整個序列的 Query、Key、Value 可以一次計算完成，因此能夠充分利用 GPU 進行平行運算。
   - Transformer 訓練速度遠快於 RNN，這也是 Transformer 能取代 RNN 的最重要原因之一。

### <a href="https://colab.research.google.com/drive/1Xhg8lQ1miCrZh2bwZv1LgCbS4XHpH19b?usp=drive_link" title="HW4 Self-Attention Colab ">HW4	Self-Attention</a>
<font color="blue">Conformer</font> 就是 Transformer + CNN 的結合，專門為語音設計的，是目前語音辨識的主流架構。

Conformer = **Transformer + CNN** 的混合架構，2020年 Google 提出，專門為語音設計。

為什麼單用 Transformer 不夠？
Transformer 的 Self-Attention 可以看到**整段序列**的關係，但對**局部細節**不夠敏感。
語音有兩種重要的資訊:
**局部**:相鄰幾幀的音素變化（子音、母音的轉換）→ CNN 擅長
**全局**:整句話的韻律、說話者特徵 → Transformer 擅長

單用 Transformer 只抓全局，單用 CNN 只抓局部，Conformer 把兩個合在一起。

---

# seq2seq

[![Transformer](Transformer.png)](https://arxiv.org/pdf/1706.03762)

e.g. speech recognition, machine translation, speech translation, chatbot, syntactic parsing, Multi-label classification(an object can belong to multiple classes), object detection,...

```mermaid
flowchart LR
subgraph ModelTasks [Key Concept: Output length is determined by model]
    direction LR
    A([一段聲音]) -- speech recognition --> B[/辨識出的文字/]
    C([一個語言句子]) -- machine translation --> D[/另一個語言句子/]
    E([一段聲音]) -- speech translation --> F[/翻譯出的文字/]
    G([input]) -- chatbot --> H[/response/]
  end
```

```mermaid
flowchart LR
    %% 定義配色方案
    classDef io fill:#fff4dd,stroke:#d4a017,stroke-width:2px;
    classDef core fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#01579b;

    subgraph seq2seq [Seq2Seq model architecture]
        direction LR
        style seq2seq fill:#fdfdfd,stroke:#999,stroke-dasharray: 5 5

        %% 節點定義 - 使用引號包裹文字以避免解析錯誤
        A(["Input sequence"])
        B(Encoder)
        C(Decoder)
        D(["Output sequence"])

        %% 連線
        A ==> B
        B ==>|Context Vector| C
        C ==> D
    end

    %% 應用樣式
    class A,D io
    class B,C core
```

## seq2seq encoder
<img src="seq2seqencoder.png" width="75%">

一個Block在做的事情是好幾個layer在做的事情

## 原始Transformer encoder
<img src="transformerencoder.png" width="70%">
<img src="realtransformerencoder.png" width="25%">

## Transformer decoder - Autoregressive decoder(最常見)

<img src="transformerdecoder-1.png" width="85%">
<img src="transformerdecoder-2.png" width="85%">
<img src="transformerdecoder-3.png" width="65%">
<img src="transformerdecoder-4.png" width="25%">

### masked Self-Attention

<img src="maskedselfattention-1.png" width="75%">
<img src="maskedselfattention-2.png" width="75%">

### Cross attention

<img src="crossattention.png" width="65%">

<img src="crossattention-1.png" width="45%">
<img src="crossattention-2.png" width="45%">

## Train

<img src="transformertraining.png" width="90%">

---

# Generative Adversarial Network(GAN)

## Generator

## Discriminator

---

# BERT

BERT is a self-supervised learning(learn from **unlabeled** data), ChatGPT, Gemini, Claude, Llama, and Grok are also self-supervised learning  
BERT一般用在自然語言處理上,當然語音與圖片也可當作seq2seq處理

<img src="bert.png" width="80%">

HOW TO TRAIN BERT?(有兩個任務要學)(it is **Unsupervised**)
<img src="howtotrainbert-1.png" width="80%">
<img src="howtotrainbert-2.png" width="80%">

sentence1與sentence2是否相接

所以BERT學會做填空題, 那要如何使用BERT?  
BERT就像是幹細胞

<img src="howtousebert.png" width="80%">

they are **Semi-Supervised**

<img src="howtousebertcase1.png" width="45%">
<img src="howtousebertcase2.png" width="45%">
<img src="howtousebertcase3.png" width="45%">
<img src="howtousebertcase4.png" width="45%">

---

# Explainable ML

<img src="whyexplainableml.png">

- Goal of Explainable ML
  - <font color="blue">Make people comfortable</font>

- **saliency map**
  - A **saliency map** is a **visual representation that highlights the most prominent or influential regions in a piece of data**, such as pixels in an image or tokens in a text. Its primary goal is to identify exactly which features most strongly influenced a specific outcome.
<img src="smoothgrad.png" widht=45%>
why saliency map? ans:make people comfortable

---

# Reinforcement Learning

what is Reinforcement Learning? 
ans:<font color="green">It is still a machine learning method used when labeled data is unavailable; the model learns through rewards and penalties from its actions.</font>
![reinforcement learning](reinforcementlearning.png)
e.g.Space invader, Alpha go
<img src="spaceinvader.png" width="80%">
<img src="alphago.png" width="80%">

從遊戲開始到結束稱為一個<ins>**episode**</ins>, 每過一個episode算一次<ins>total reward</ins>(return)

<img src="policygradient.png">
The <font color="blue">trajectory</font> is defined as $\tau=\{s_1,a_1,s_2,a_2,\dots\}$

train on reinforcement learning 很卡的一個地方是:每次更新一次參數就要蒐集一次資料, called <font color="blue">on-policy</font>(the <font color="green">actor to train</font> and the <font color="orange">actor for interacting</font> is the same)

---

# Life Long Learning

學完task1 再學task2, 可能會忘記task1學過的東西

<img src="catastrophicforget.png" width="60%">

跟Transfer Learning不一樣, 
**Transfer Learning** is<font color="blue"> <ins>I can do task2 because I have learned task1.</ins></font>
**Life Long Learning** is <font color="blue"><ins>even though i have learned task2, I do not forget task1.</ins></font>

## Evaluate life long learning model(3 types)

<img src="lllevaluation.png" width="70%">

<img src="lllbackwardtransfer.png" width="70%">

backward transfer是看model的遺忘程度

<img src="lllforwardtransfer.png" width="70%">

forward transfer是還未看到$T_T$, 只看到$T_1$到$T_T-1$時, 看model學到甚麼程度

## 解決Catastrophic Forgetting

### Selective Synaptic Plasticity

<img src="SelectiveSynapticPlasticity-1.png" width="80%">
<img src="SelectiveSynapticPlasticity-2.png" width="80%">
<img src="SelectiveSynapticPlasticity-3.png" width="80%">

$b_i$是人為設定的
<img src="SelectiveSynapticPlasticity-4.png" width="80%">

---

# Network Compression

why Network Compression?
<img src="networkcompression.png" width="70%">

- 方法
  - Network Pruning
    - weight pruning(不推薦, 因為矩陣乘法還是沒有變小, 只是把weight改成0而已)
    - neuron pruning(easy to implement, easy to speedup)
  - Knowledge Distillation
  - Parameter Quantization
  - Architecture Design(以CNN為例,
    - Depthwise Separable Convolution
      - Depthwise Convolution + Pointwise Convolution )
  - Dynamic Computation(希望network可以自由地調整自己需要的運算量)

---

# Meta Learning


what does "Meta" mean?
<font color="green">meta-X is <ins>X about X</ins></font>, so Meta Learning is <font color="blue"><ins>Learning about Learning</ins></font>.

<img src="metalearning.png" width="80%">
<img src="metalearninggoal.png" width="80%">

## meta learning steps

<img src="metalearningstep1.png" width="80%">
<img src="metalearningstep2-1.png" width="80%">
<img src="metalearningstep2-2.png" width="80%">
<img src="metalearningstep2-3.png" width="80%">
<img src="metalearningstep2-4.png" width="80%">

<img src="metalearningstep2-5.png" width="60%">

跟一般machine learning不太一樣, meta learning是用testing examples來算loss

<img src="metalearningstep3.png" width="80%">

## compare machine learning & meta learning

<img src="compare-1.png" width="80%">
<img src="compare-2.png" width="80%">
<img src="compare-3.png" width="80%">
<img src="compare-4.png" width="80%">
<img src="compare-5findminloss.png" width="60%">