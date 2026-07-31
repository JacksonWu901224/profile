# 分類模型與電腦視覺評估指標筆記 ( Classification & Computer Vision Metrics )

在機器學習（分類模型、醫療診斷）與電腦視覺（圖像分割、物件偵測）中，我們常用混淆矩陣（Confusion Matrix）及集合論衍生的各項指標來評估模型效能。

---

## 📊 一、常見分類評估指標 ( Classification Metrics )

### 1. AUC（Area Under the ROC Curve，ROC 曲線下面積）

* **定義**：ROC 曲線下方的總面積，用來衡量模型在不同判斷門檻（Threshold）下的整體**排序與區分能力**。
  * 本質上是：隨機抽一個正樣本與一個負樣本，模型給正樣本較高預測分數的機率——衡量的是「排序能力」，不是直接的分類正確率。
* **評估標準**：
  * **`AUC = 1.0`**：完美分類模型。
  * **`AUC = 0.5`**：模型能力等同於隨機擲硬幣。
  * **`AUC < 0.5`**：預測方向相反（反轉預測結果即可提升）。
* **注意**：AUC 相較 Accuracy 對類別比例較不敏感，但並非「完全不受影響」——在極度不平衡資料（如 9990 健康、10 生病）下，AUC 仍可能過度樂觀，無法反映模型實際找出少數類的能力，仍需搭配 PPV、Sensitivity 等指標一起看。

---

### 2. Accuracy（準確率）

* **定義**：在**所有**預測樣本中，模型猜對的比例（包含正確猜對正類與負類）。
* **公式**：
  $$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$
* **優缺點**：最直覺，但在**資料極度不平衡**時會失真（例如：99 個健康、1 個生病，模型全部猜健康也有 99% 的 Accuracy）。

---

### 3. Sensitivity（敏感度 / Recall 召回率 / True Positive Rate, TPR）

* **定義**：在所有 **實際為正類（如：真的有病）** 的樣本中，模型成功抓出的比例。
* **公式**：
  $$\text{Sensitivity} = \frac{TP}{TP + FN}$$
* **應用場景**：適用於 **「寧可錯殺，不可放過」** 的情境（如：癌症篩檢、信用卡盜刷檢測，絕不能漏掉正類）。

---

### 4. Specificity（特異度 / True Negative Rate, TNR）

* **定義**：在所有 **實際為負類（如：真的健康）** 的樣本中，模型成功認出（判斷為陰性）的比例。
* **公式**：
  $$\text{Specificity} = \frac{TN}{TN + FP}$$
* **應用場景**：特異度高代表模型 **不容易報假警**（例如：不會輕易把健康的人誤診為癌症）。

---

### 5. F1-Score（F1 分數） / Dice Coefficient（Dice 相似係數）

* **定義**：精確率（PPV / Precision）與敏感度（Sensitivity / Recall）的**調和平均數（Harmonic Mean）**。在圖像分割（Segmentation）領域稱為 **Dice 系數**（數學上完全等價）。
* **公式**：
  $$\text{F1-Score} = 2 \times \frac{\text{PPV} \times \text{Sensitivity}}{\text{PPV} + \text{Sensitivity}} = \frac{2 \cdot TP}{2 \cdot TP + FP + FN}$$
  $$\text{Dice} = \frac{2|\text{Predicted} \cap \text{Target}|}{|\text{Predicted}| + |\text{Target}|}$$
* **優缺點**：數值介於 `0 ~ 1` 之間，越接近 `1` 越好。能綜合評估捕捉能力與準確度，在**類別不平衡**時比 Accuracy 更具參考價值。
* **注意**：F1 = Dice 的等價關係，前提是**二元分割（binary segmentation）且以 pixel 為樣本單位**計算。若是 **multi-class segmentation**（如 background / cat / dog），通常改採 **per-class Dice** 再取 **mean Dice**，而非單一 F1 值。

---

### 6. PPV（Positive Predictive Value，陽性預測值 / Precision 精確率）

* **定義**：在所有被模型 **判定為陽性（預測有病）** 的樣本中，實際真的為陽性的比例。
* **公式**：
  $$\text{PPV} = \frac{TP}{TP + FP}$$
* **特點**：站在「預測結果」的角度思考。關注的是模型警報的準確度（出錯/誤報的代價高不高）。受資料盛行率（Prevalence）影響極大。

---

### 7. NPV（Negative Predictive Value，陰性預測值）

* **定義**：在所有被模型 **判定為陰性（預測健康）** 的樣本中，實際真的為陰性的比例。
* **公式**：
  $$\text{NPV} = \frac{TN}{TN + FN}$$
* **特點**：當模型告訴使用者「沒問題/陰性」時，使用者可以安心的程度（漏報的代價高不高）。

---

### 8. FPR（False Positive Rate，假陽性率 / 誤報率）

* **定義**：在所有 **實際為負類（如：真的健康）** 的樣本中，被模型誤診為陽性（有病）的比例。
* **公式**：
  $$\text{FPR} = \frac{FP}{FP + TN} = 1 - \text{Specificity}$$
* **特點**：越低越好（希望接近 0）。此指標即為 ROC 曲線的 X 軸。

---

### 9. FNR（False Negative Rate，假陰性率 / 漏報率）

* **定義**：在所有 **實際為正類（如：真的有病）** 的樣本中，被模型漏抓/誤判為陰性的比例。
* **公式**：
  $$\text{FNR} = \frac{FN}{TP + FN} = 1 - \text{Sensitivity}$$
* **特點**：越低越好，代表模型不漏抓。

---

### 10. MCC（Matthews Correlation Coefficient，馬修斯相關係數）

* **定義**：考量混淆矩陣所有四個象限（TP, TN, FP, FN）的綜合相關係數。
* **公式**：
  $$\text{MCC} = \frac{TP \times TN - FP \times FN}{\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}$$
* **特點**：範圍為 `-1 ~ +1`（`+1` 為完美預測、`0` 為沒有相關、`-1` 為完全反向）。是在**類別極度不平衡**資料下相當穩健的單一評估指標之一（而非「最客觀」的唯一指標——不同任務仍有各自偏好的指標，如醫療篩檢重 Sensitivity、垃圾郵件重 Precision、分割重 Dice/IoU、極度不平衡分類也常搭配 PR-AUC 一起看）。

---

## 🖼️ 二、圖像與視覺特有指標 ( Computer Vision Metrics )

在目標檢測（Object Detection）與圖像分割（Segmentation）領域，經常以集合（Set）的方式來表示遮罩（Mask）或邊界框（Bounding Box）的重疊程度：

### 1. IoU（Intersection over Union，交併比 / Jaccard Index）

* **定義**：預測區域與真實區域（Ground Truth）的**交集面積除以併集面積**。
* **公式**：
  $$\text{IoU} = \frac{|\text{Predicted} \cap \text{Target}|}{|\text{Predicted} \cup \text{Target}|} = \frac{TP}{TP + FP + FN}$$
* **注意** : 此處 TP/FP/FN 是指空間區域(pixel 或 box)重疊關係。
* **應用場景**：Object Detection 中用於計算 **預測框與 Ground Truth 框** 的重疊程度；Segmentation 中則用於計算 **遮罩（Mask）重疊程度**。

### 2. Dice 與 IoU 的互相轉換

* $\text{Dice} = \frac{2 \cdot \text{IoU}}{1 + \text{IoU}}$
* $\text{IoU} = \frac{\text{Dice}}{2 - \text{Dice}}$

### 3. PR Curve（Precision-Recall Curve）與 AP / mAP

* **PR Curve**：以 Recall 為橫軸、Precision 為縱軸，觀察不同門檻下兩者的取捨關係。PR Curve 在正類稀少（positive class rare）的情況下，通常比 ROC Curve 更能反映模型對少數類的辨識能力。
* **AP（Average Precision）**：AP 是根據 Precision-Recall 曲線計算的單一類別評估指標，用來衡量模型在不同 Recall 下的 Precision 表現，常用於 Object Detection 評估。
* **mAP（mean Average Precision）**：對所有類別的 AP 取平均，YOLO、Faster R-CNN 等物件偵測模型的標準評估指標。
  $$\text{mAP} = \frac{1}{N}\sum_{i=1}^{N} AP_i$$
其中:
  * $N$ : 類別數量
  * $AP_i$ : 第 i 類別 AP

* **常見寫法**：`AP@0.5`（IoU 門檻 0.5 時的 AP）、`AP@0.5:0.95`（IoU 門檻從 0.5 到 0.95、間隔 0.05 取平均，COCO 標準評估方式）。

---

## ⚡ 三、錯誤類型 ( Error Types )

### 兩型錯誤 ( Type I & Type II Errors )

* **FP（假陽性 / 誤報）$\approx$ 類似第一型錯誤 ( Type I Error )**
  * 沒事報有事（如：健康者被診斷有病、正常信件被當作垃圾郵件）。
* **FN（假陰性 / 漏報）$\approx$ 類似第二型錯誤 ( Type II Error )**
  * 有事報沒事（如：癌症患者被診斷健康、不良品被放行）。通常代價極高甚至致命。

> ⚠️ **注意**：嚴格來說，統計假設檢定中的 Type I / II Error 是定義在「拒絕 / 不拒絕 $H_0$」的框架下，與分類問題的 FP / FN 並非完全對等，兩者僅為**類比關係**（結構相似），使用時不宜直接畫等號。

---

## 📈 四、什麼是 ROC 曲線？ ( ROC Curve )

**ROC** 全名為 **Receiver Operating Characteristic Curve（接收者操作特徵曲線）**，是一張用來評估分類模型在不同機率門檻（Threshold）下表現的二維圖表。

### 1. ROC 曲線的座標軸

* **橫軸（X 軸）：假陽性率（False Positive Rate, FPR）**
  * 公式：$\text{FPR} = 1 - \text{Specificity} = \frac{FP}{TN + FP}$
  * 意義：**沒病卻被誤判成有病**的比例（越低越好，希望接近 0）。
* **縱軸（Y 軸）：真陽性率（True Positive Rate, TPR / Sensitivity）**
  * 公式：$\text{TPR} = \text{Sensitivity} = \frac{TP}{TP + FN}$
  * 意義：**真的有病且被成功抓出來**的比例（越高越好，希望接近 1）。

### 2. 判讀方式

* **最佳點 (0, 1)**：位於圖表左上角，代表零誤判（FPR = 0）且全抓到（TPR = 1）。**曲線越往左上角靠攏，模型越優秀**。
* **對角線 (0,0) -> (1,1)**：代表「隨機猜測」（猜對猜錯機率各半）。曲線若落在這條線上，代表模型完全無預測能力。

### 3. Threshold 對模型表現的影響

分類模型通常輸出一個介於 0 到 1 的預測機率，透過 Threshold 將機率轉換為 Positive / Negative 類別。

降低分類 Threshold：

* 預測 Positive 數量增加
* TP 增加
* FP 增加
* FN 減少
* TN 減少

因此：

* Sensitivity ↑
* Recall ↑
* Specificity ↓
* Precision 可能下降

不同 Threshold 會產生不同的 Confusion Matrix，因此也會產生不同的 TPR、FPR、Precision 與 Recall。ROC Curve 與 PR Curve 即是利用不同 Threshold 下的結果來評估模型整體表現。

模型實務上通常需依照任務需求選擇最佳 Threshold。

---

## 💡 五、指標速查對照表

| 指標 | 觀察視角 / 關注焦點 | 適用情境 / 特點 |
| :--- | :--- | :--- |
| **ROC / AUC** | 不同 threshold 下的排序與區分能力 | 跨模型比較常用;相較 Accuracy 對類別比例較不敏感，但極端不平衡時仍需搭配其他指標 |
| **Accuracy** | 全局猜對比例 | 資料平衡時使用 |
| **Sensitivity (Recall)** | 站在**真實患者**角度（抓出率） | 醫療診斷、安檢（寧可錯殺，不可放過） |
| **Specificity** | 站在**真實健康者**角度（辨識率） | 避免誤診、品質抽檢（減少假警報） |
| **F1-Score / Dice** | 兼顧 Precision 與 Recall | 類別不平衡資料、圖像分割（Segmentation）, 尤其適合正類稀少的 binary classification 或 segmentation |
| **PPV (Precision)** | 站在**模型猜陽性**的角度（準確率） | 廣告點擊率、垃圾郵件（警報必須準） |
| **NPV** | 站在**模型猜陰性**的角度（安心度） | 評估排除疾病或風險的可靠度 |
| **FPR** | 站在**真實健康者**角度（誤報率） | 評估亂報警程度，ROC 曲線的 X 軸 |
| **FNR** | 站在**真實患者**角度（漏報率） | 評估漏診程度 |
| **MCC** | 綜合四個象限的極端平衡 | 嚴苛評估極度不平衡資料時的重要指標之一 |
| **IoU (Jaccard)** | 重疊面積占比 | 物件偵測（Object Detection）、圖像分割 |

---

## 📝 六、混淆矩陣結構 ( Confusion Matrix )

### 1. 表格結構

| | 預測 Positive ( 陽性 ) | 預測 Negative ( 陰性 ) |
| :--- | :--- | :--- |
| **實際 Positive** | **TP** ( True Positive, 真陽 ) | **FN** ( False Negative, 假陰 / 類似 Type II Error ) |
| **實際 Negative** | **FP** ( False Positive, 假陽 / 類似 Type I Error ) | **TN** ( True Negative, 真陰 ) |

> 💡 **判讀口訣** :
>
> * 第一個字看**對錯**（True 代表猜對，False 代表猜錯）。
> * 第二個字看**模型猜什麼**（Positive 代表猜正類，Negative 代表猜負類）。

### 2. 實務觀念：門檻調校與正規化

* **分類閾值（Threshold）**：混淆矩陣的數值會隨判定門檻改變。降低門檻時（如由 $0.5$ 降至 $0.2$），通常會使更多樣本被判為 Positive，因此 **TP 與 FP 傾向增加，FN 與 TN 傾向減少**（提升 Sensitivity，降低 Specificity）。
* **正規化混淆矩陣（Normalized Confusion Matrix）**：當正負樣本數量懸殊時，將矩陣轉換為比例/百分比（0.0 ~ 1.0），有助於更客觀地比較不同類別的辨識表現。
