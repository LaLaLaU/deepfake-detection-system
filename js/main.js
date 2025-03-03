/**
 * DeepGuard - AI多模态Deepfake检测系统
 * 主JavaScript文件
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 添加滚动动画
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .team-card, .step-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if(elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // 初始加载时执行一次
    animateOnScroll();
    
    // 滚动时执行
    window.addEventListener('scroll', animateOnScroll);
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 初始化工具提示
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// 表单提交处理
const handleFormSubmit = (event, formType) => {
    event.preventDefault();
    
    // 获取表单元素
    const form = event.target;
    const formData = new FormData(form);
    
    // 模拟表单提交和加载状态
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 处理中...';
    
    // 模拟API请求延迟
    setTimeout(() => {
        // 这里是模拟的检测结果数据
        let resultData = {};
        
        switch(formType) {
            case 'text':
                resultData = {
                    isDeepfake: Math.random() > 0.5,
                    confidence: Math.floor(Math.random() * 30) + 70,
                    features: {
                        coherence: Math.floor(Math.random() * 100),
                        grammar: Math.floor(Math.random() * 100),
                        naturalness: Math.floor(Math.random() * 100)
                    }
                };
                break;
                
            case 'audio':
                resultData = {
                    isDeepfake: Math.random() > 0.5,
                    confidence: Math.floor(Math.random() * 30) + 70,
                    features: {
                        voicePrint: Math.floor(Math.random() * 100),
                        backgroundNoise: Math.floor(Math.random() * 100),
                        speechPatterns: Math.floor(Math.random() * 100)
                    }
                };
                break;
                
            case 'image':
                resultData = {
                    isDeepfake: Math.random() > 0.5,
                    confidence: Math.floor(Math.random() * 30) + 70,
                    features: {
                        faceInconsistencies: Math.floor(Math.random() * 100),
                        backgroundAnomalies: Math.floor(Math.random() * 100),
                        metadataAnalysis: Math.floor(Math.random() * 100)
                    }
                };
                break;
                
            case 'video':
                resultData = {
                    isDeepfake: Math.random() > 0.5,
                    confidence: Math.floor(Math.random() * 30) + 70,
                    features: {
                        facialMovements: Math.floor(Math.random() * 100),
                        lipSync: Math.floor(Math.random() * 100),
                        blinkingPatterns: Math.floor(Math.random() * 100),
                        temporalConsistency: Math.floor(Math.random() * 100)
                    }
                };
                break;
        }
        
        // 显示结果
        showDetectionResult(resultData, formType);
        
        // 恢复按钮状态
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
    }, 2000); // 2秒模拟延迟
};

// 显示检测结果
const showDetectionResult = (data, type) => {
    const resultContainer = document.getElementById(`${type}-result`);
    if (!resultContainer) return;
    
    // 清空之前的结果
    resultContainer.innerHTML = '';
    
    // 创建结果卡片
    const resultCard = document.createElement('div');
    resultCard.className = 'result-card animate__animated animate__fadeIn';
    
    // 结果标题和图标
    const resultHeader = document.createElement('div');
    resultHeader.className = 'result-header';
    
    const resultTitle = document.createElement('h3');
    resultTitle.className = data.isDeepfake ? 'text-danger' : 'text-success';
    resultTitle.innerHTML = data.isDeepfake ? 
        '<i class="bi bi-exclamation-triangle-fill"></i> 检测为Deepfake内容' : 
        '<i class="bi bi-check-circle-fill"></i> 检测为真实内容';
    
    resultHeader.appendChild(resultTitle);
    
    // 可信度评分
    const confidenceScore = document.createElement('div');
    confidenceScore.className = 'confidence-score';
    
    const scoreLabel = document.createElement('p');
    scoreLabel.textContent = '可信度评分:';
    
    const scoreValue = document.createElement('div');
    scoreValue.className = 'score-value';
    
    const scoreNumber = document.createElement('span');
    scoreNumber.className = data.isDeepfake ? 'text-danger' : 'text-success';
    scoreNumber.textContent = `${data.confidence}%`;
    
    scoreValue.appendChild(scoreNumber);
    confidenceScore.appendChild(scoreLabel);
    confidenceScore.appendChild(scoreValue);
    
    // 特征分析
    const featuresAnalysis = document.createElement('div');
    featuresAnalysis.className = 'features-analysis';
    
    const featuresTitle = document.createElement('h4');
    featuresTitle.textContent = '特征分析';
    
    const featuresList = document.createElement('div');
    featuresList.className = 'features-list';
    
    // 添加所有特征
    for (const [key, value] of Object.entries(data.features)) {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        
        const featureName = document.createElement('span');
        featureName.className = 'feature-name';
        
        // 将驼峰命名转换为更友好的显示
        const featureDisplayName = key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
        
        featureName.textContent = featureDisplayName;
        
        const featureBar = document.createElement('div');
        featureBar.className = 'feature-bar';
        
        const featureProgress = document.createElement('div');
        featureProgress.className = 'feature-progress';
        featureProgress.style.width = `${value}%`;
        featureProgress.style.backgroundColor = getColorForValue(value, data.isDeepfake);
        
        const featureValue = document.createElement('span');
        featureValue.className = 'feature-value';
        featureValue.textContent = `${value}%`;
        
        featureBar.appendChild(featureProgress);
        featureItem.appendChild(featureName);
        featureItem.appendChild(featureBar);
        featureItem.appendChild(featureValue);
        
        featuresList.appendChild(featureItem);
    }
    
    featuresAnalysis.appendChild(featuresTitle);
    featuresAnalysis.appendChild(featuresList);
    
    // 添加说明和建议
    const recommendation = document.createElement('div');
    recommendation.className = 'recommendation';
    
    const recommendationText = document.createElement('p');
    recommendationText.innerHTML = data.isDeepfake ? 
        '该内容可能是AI生成或处理的。建议您谨慎对待此内容，并从其他可靠来源交叉验证。' : 
        '该内容很可能是真实的。但仍建议结合内容上下文和其他信息综合判断。';
    
    recommendation.appendChild(recommendationText);
    
    // 组装结果卡片
    resultCard.appendChild(resultHeader);
    resultCard.appendChild(confidenceScore);
    resultCard.appendChild(featuresAnalysis);
    resultCard.appendChild(recommendation);
    
    // 显示结果
    resultContainer.appendChild(resultCard);
    resultContainer.style.display = 'block';
    
    // 平滑滚动到结果区域
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// 根据值获取颜色
const getColorForValue = (value, isDeepfake) => {
    // 为Deepfake内容和真实内容使用不同的颜色逻辑
    if (isDeepfake) {
        // 值越高表示特征越可疑
        if (value >= 80) return '#dc3545'; // 红色
        if (value >= 60) return '#fd7e14'; // 橙色
        if (value >= 40) return '#ffc107'; // 黄色
        return '#20c997'; // 青色
    } else {
        // 值越高表示特征越真实
        if (value >= 80) return '#198754'; // 绿色
        if (value >= 60) return '#20c997'; // 青色
        if (value >= 40) return '#ffc107'; // 黄色
        return '#dc3545'; // 红色
    }
};

// 文件上传预览
const handleFileSelect = (event, previewElementId) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const previewElement = document.getElementById(previewElementId);
    if (!previewElement) return;
    
    // 清除之前的预览
    previewElement.innerHTML = '';
    
    // 文件大小格式化
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
        else return (bytes / 1073741824).toFixed(2) + ' GB';
    };
    
    // 创建文件信息元素
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    
    // 根据文件类型创建不同的预览
    if (file.type.startsWith('image/')) {
        // 图像预览
        const img = document.createElement('img');
        img.className = 'img-preview';
        img.file = file;
        
        previewElement.appendChild(img);
        
        const reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
        // 视频预览
        const video = document.createElement('video');
        video.className = 'video-preview';
        video.controls = true;
        
        previewElement.appendChild(video);
        
        const reader = new FileReader();
        reader.onload = (function(aVideo) { 
            return function(e) { 
                aVideo.src = e.target.result; 
            }; 
        })(video);
        
        reader.readAsDataURL(file);
    } else if (file.type.startsWith('audio/')) {
        // 音频预览
        const audio = document.createElement('audio');
        audio.className = 'audio-preview';
        audio.controls = true;
        
        previewElement.appendChild(audio);
        
        const reader = new FileReader();
        reader.onload = (function(aAudio) { 
            return function(e) { 
                aAudio.src = e.target.result; 
            }; 
        })(audio);
        
        reader.readAsDataURL(file);
    } else if (file.type === 'text/plain' || file.type === 'application/pdf' || 
              file.type === 'application/msword' || 
              file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // 文本文件预览 (只显示图标和名称)
        const fileIcon = document.createElement('i');
        fileIcon.className = 'bi bi-file-text file-icon';
        
        fileInfo.appendChild(fileIcon);
    }
    
    // 文件名和大小信息
    const fileName = document.createElement('p');
    fileName.className = 'file-name';
    fileName.textContent = file.name;
    
    const fileSize = document.createElement('p');
    fileSize.className = 'file-size';
    fileSize.textContent = formatFileSize(file.size);
    
    fileInfo.appendChild(fileName);
    fileInfo.appendChild(fileSize);
    
    previewElement.appendChild(fileInfo);
    previewElement.style.display = 'flex';
};
