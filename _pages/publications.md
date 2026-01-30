---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

<div class="page-header" data-aos="fade-up">
  <h1 class="page-title"><span class="gradient-text">📚 Research Publications</span></h1>
  <p class="page-description">Peer-reviewed journal articles and conference papers in AI, Machine Learning, and Computer Vision</p>
  
  <div class="stats-grid">
    <div class="stat-item">
      <span class="stat-number">10+</span>
      <span class="stat-label">Publications</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">Q1</span>
      <span class="stat-label">Top Journals</span>
    </div>
    <div class="stat-item">
      <span class="stat-number">100+</span>
      <span class="stat-label">Citations</span>
    </div>
  </div>
  
  <div class="scholar-link">
    <a href="https://scholar.google.com/citations?user=HYNOyyAAAAAJ&hl=en" target="_blank" class="btn-glow">
      <i class="fas fa-graduation-cap"></i> View Google Scholar Profile
    </a>
  </div>
</div>

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

<div class="publications-list" data-aos="fade-up">
{% for post in site.publications reversed %}
  <div class="pub-card">
    <div class="pub-year">{{ post.date | date: "%Y" }}</div>
    <div class="pub-content">
      <h3 class="pub-title">
        <a href="{{ post.paperurl }}" target="_blank">{{ post.title }}</a>
      </h3>
      {% if post.excerpt %}
        <p class="pub-excerpt">{{ post.excerpt | markdownify | strip_html | truncatewords: 30 }}</p>
      {% endif %}
      {% if post.venue %}
        <p class="pub-venue"><i class="fas fa-journal-whills"></i> {{ post.venue }}</p>
      {% endif %}
      <div class="pub-links">
        {% if post.paperurl %}
          <a href="{{ post.paperurl }}" target="_blank"><i class="fas fa-file-pdf"></i> Paper</a>
        {% endif %}
        {% if post.citation %}
          <a href="#" class="cite-btn" data-citation="{{ post.citation }}"><i class="fas fa-quote-right"></i> Cite</a>
        {% endif %}
      </div>
    </div>
  </div>
{% endfor %}
</div>

<style>
.page-header {
  text-align: center;
  margin-bottom: 60px;
  padding: 40px 0;
}

.page-title {
  font-size: 2.5em;
  font-weight: 800;
  margin-bottom: 16px;
}

.page-description {
  color: #94a3b8;
  font-size: 1.1em;
  max-width: 600px;
  margin: 0 auto 40px;
}

.stats-grid {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 20px 32px;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: 700;
  background: linear-gradient(135deg, #00f5ff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.9em;
  margin-top: 4px;
}

.scholar-link {
  margin-top: 24px;
}

.publications-list {
  max-width: 900px;
  margin: 0 auto;
}

.pub-card {
  display: flex;
  gap: 24px;
  background: rgba(26, 26, 46, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.3s ease;
}

.pub-card:hover {
  border-color: rgba(0, 245, 255, 0.5);
  transform: translateX(10px);
  box-shadow: -5px 0 30px rgba(0, 245, 255, 0.2);
}

.pub-year {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #00f5ff, #a855f7);
  border-radius: 12px;
  font-weight: 700;
  font-size: 1em;
  color: #0a0a0f;
}

.pub-content {
  flex: 1;
}

.pub-title {
  font-size: 1.15em;
  font-weight: 600;
  margin: 0 0 12px;
  line-height: 1.4;
}

.pub-title a {
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.3s;
}

.pub-title a:hover {
  color: #00f5ff;
}

.pub-excerpt {
  color: #94a3b8;
  font-size: 0.9em;
  line-height: 1.6;
  margin-bottom: 12px;
}

.pub-venue {
  color: #a855f7;
  font-weight: 500;
  font-size: 0.9em;
  margin-bottom: 16px;
}

.pub-venue i {
  margin-right: 8px;
}

.pub-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.pub-links a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(0, 245, 255, 0.1);
  border: 1px solid rgba(0, 245, 255, 0.3);
  border-radius: 8px;
  color: #00f5ff;
  font-size: 0.85em;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pub-links a:hover {
  background: rgba(0, 245, 255, 0.2);
  box-shadow: 0 0 15px rgba(0, 245, 255, 0.3);
}

@media (max-width: 768px) {
  .pub-card {
    flex-direction: column;
    gap: 16px;
  }
  
  .pub-year {
    width: fit-content;
    padding: 8px 16px;
    height: auto;
  }
  
  .page-title {
    font-size: 1.8em;
  }
}
</style>
